# Stargate Node gRPC Client

This package provides the ability for Node applications to communicate with the [Stargate data gateway](https://stargate.io/) via gRPC.

## Quick start guide

To begin, you'll need to add the necessary dependency to your project:

Using NPM:

```shell
npm i @stargate/stargate-grpc-node-client
```

Using Yarn:

```shell
yarn add @stargate/stargate-grpc-node-client
```

If you don't already have access to a Stargate deployment one can be started quickly for testing using the following Docker
command to run Stargate locally in developer mode and expose port 8090 for gRPC connections:

```shell
docker run --name stargate \
  -p 8081:8081 \
  -p 8090:8090 \
  -d \
  -e CLUSTER_NAME=stargate \
  -e CLUSTER_VERSION=3.11 \
  -e DEVELOPER_MODE=true \
  stargateio/stargate-3_11:v1.0.35
```

Ensure the local instance of Stargate is running properly by tailing the logs for the container with `docker logs -f stargate`. When you see this message, Stargate is ready for traffic:

`Finished starting bundles.`

### Connecting

To connect to your Stargate instance set up the client as follows. This example assumes that you're running Stargate locally
with the default credentials of `cassandra/cassandra`. For more information regarding authentication please see the
[Stargate authentication and authorization docs](https://stargate.io/docs/stargate/1.0/developers-guide/authnz.html).

```typescript
import * as grpc from "@grpc/grpc-js";
import { StargateClient, StargateTableBasedToken, Query, toResultSet, Response, promisifyStargateClient } from "@stargate/stargate-grpc-node-client";

// Create a client for Stargate/Cassandra authentication using the default C* username and password
const creds = new StargateTableBasedToken({username: 'cassandra', password: 'cassandra'});

// Create the gRPC client, passing it the address of the gRPC endpoint
const stargateClient = new StargateClient('localhost:8090', grpc.credentials.createInsecure());

// Create a promisified version of the client, so we don't need to use callbacks
const promisifiedClient = promisifyStargateClient(stargateClient);
```

### Authentication



### Querying

A simple query can be performed by passing a CQL query to the client:

```typescript
const query = new Query();
query.setCql('select cluster_name from system.local');

// Must manually generate auth metadata if using insecure creds - see authentication section below for details
const authenticationMetadata = await creds.generateMetadata({service_url: 'http://localhost:8081/v1/auth'});
await promisifiedClient.executeQuery(query, authenticationMetadata);
```

Data definition (DDL) queries are supported in the same manner:

```typescript
// Create a new keyspace
const createKeyspaceStatement = new Query();
createKeyspaceStatement.setCql("CREATE KEYSPACE IF NOT EXISTS ks1 WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};");

await promisifiedClient.executeQuery(query, authenticationMetadata);

// Create a new table
const createTableStatement = new Query();
createTableStatement.setCql("CREATE TABLE IF NOT EXISTS ks1.tbl2 (key text PRIMARY KEY,value text);");

await promisifiedClient.executeQuery(query, authenticationMetadata);
```

Parameterized queries are also supported:

```typescript
const query = new Query();
query.setCql("select * from system_schema.keyspaces where keyspace_name = ?");

const payload = new Payload();
payload.setType(0);
const any = new Any();
any.setValue("system");
payload.setData(any);

const queryParameters = new QueryParameters();
queryParameters.setTracing(false);
queryParameters.setSkipMetadata(false);

query.setValues(payload);
query.setParameters(queryParameters);

await promisifiedClient.executeQuery(query, authenticationMetadata);
```

If you would like to use a [batch statement](https://cassandra.apache.org/doc/latest/cassandra/cql/dml.html#batch_statement), the client also provides an `executeBatch()` function for this purpose:

```typescript
const insertOne = new BatchQuery();
const insertTwo = new BatchQuery();

insertOne.setCql(`INSERT INTO ${KEYSPACE}.test (key, value) VALUES('a', 1)`);
insertTwo.setCql(`INSERT INTO ${KEYSPACE}.test (key, value) VALUES('b', 2)`);

const batch = new Batch();
batch.setQueriesList([insertOne, insertTwo]);

await promisifiedClient.executeBatch(batch, authenticationMetadata);
```

### Processing the result set

After executing a query a response will be returned containing rows for a SELECT statement, otherwise the returned payload will be unset. The convenience function `ToResultSet()` is provided to help transform this response into a ResultSet that's easier to work with.

```typescript
// Insert a record into the table
const insert = new Query();
insert.setCql("INSERT INTO ks1.tbl2 (key, value) VALUES ('a', 'alpha');");
await promisifiedClient.executeQuery(insert, authenticationMetadata);

// Read the data back out
const read = new Query();
read.setCql("SELECT key, value FROM ks1.tbl2");
const result = await promisifiedClient.executeQuery(read, authenticationMetadata);

const resultSet = toResultSet(result);

// TODO: should this throw instead of returning undefined?
if (resultSet) {
  const firstRow = resultSet.getRowsList()[0];
  // We call getString() here because we know the type being returned. See below for details on working with types.
  const key = firstRow.getValuesList()[0].getString();
  console.log(`key: ${key}`);
}
```

#### Reading primitive values

Individual values from queries will be returned as a `Value` object. These objects have boolean `hasX()` methods, where X is the possible type of a value.

There are corresponding `getX()` methods on the `Value` type that will return the value, if present. If the value does not represent type X, calling `getX()` will not return an error. You'll get `undefined` or another falsy value based on the expected data type.

```typescript
const firstValueInRow = row.getValuesList()[0]; // Assume we know this is a string

const isString = firstValueInRow.hasString(); // will resolve to true
const stringValue = firstValueInRow.getString(); // will resolve to the string value

const isInt = firstValueInRow.hasInt(); // false
const intValue = firstValueInRow.getInt(); // 0 - zero value for this data type
```

#### Reading CQL data types





```typescript
try {
    const query = new Query();
    query.setCql('select cluster_name from system.local');

    const result: Response = await promisifiedClient.executeQuery(query, authenticationMetadata);
    
    const resultSet = toResultSet(result);

    if (resultSet) {
        const firstRowReturned = resultSet.getRowsList()[0];
        const clusterName = firstRowReturned.getValuesList()[0].getString();
        console.log(`cluster name returned from gRPC call: ${clusterName}`);
    }

} catch (e) {
    console.error(`Error making gRPC call: ${e}`)
}
```

### Authentication

The `TableBasedCallCredentials` class generates gRPC metadata with an auth token from [the Stargate Auth API](https://stargate.io/docs/stargate/1.0/developers-guide/auth.html). Construct an instance using the username and password of a user in your Cassandra database, then call the `generateMetadata` method with the location of your Stargate instance's auth endpoint:

```typescript
const stargateCallCredentials = new TableBasedCallCredentials({
  username: "cassandra",
  password: "cassandra",
});

try {
  const stargateAuthMetadata = await stargateCallCredentials.generateMetadata({
    service_url: "http://localhost:8081/v1/auth",
  });
} catch (e) {
  // Something went wrong calling the auth endpoint
  throw e;
}
```

The `generateMetadata` method POSTs on your Stargate auth endpoint to fetch a token, then sets it on the metadata it returns.

You can reuse the same `TableBasedCallCredentials` instance but should call `generateMetadata` on it for each gRPC call you make, to ensure you don't use a stale auth token.

### gRPC calls

Create a `StargateClient` instance with the address of your gRPC server and any credentials needed to connect. Note Stargate exposes port 8090 for gRPC traffic by default:

```typescript
const stargateClient = new StargateClient(
  "localhost:8090",
  grpc.credentials.createInsecure()
);
```

The client follows the `@grpc/grpc-js` callback style for sending queries and batches:

```typescript
stargateClient.executeQuery(
  query,
  authenticationMetadata,
  (error: grpc.ServiceError | null, value?: Response) => {
    if (error) {
      // something went wrong
    }
    if (value) {
      // the call succeeded
    }
  }
);
```

### Promise support

If you'd prefer promises over callbacks, this library provides a utility function to create a promisified version of the Stargate gRPC client. The promise will reject if an error occurs:

```typescript
import {
  StargateClient,
  promisifyStargateClient,
} from "@stargate/stargate-grpc-node-client";

const stargateClient = new StargateClient(
  "localhost:8090",
  grpc.credentials.createInsecure()
);

const promisifiedClient = promisifyStargateClient(stargateClient);
try {
  const queryResult = await promisifiedClient.executeQuery(
    query,
    metadata,
    callOptions
  );
  const batchResult = await promisifiedClient.executeBatch(
    query,
    metadata,
    callOptions
  );
} catch (e) {
  // something went wrong
}
```

The `metadata` and `callOptions` arguments are both optional.

### Working with responses

A response will contain a `ResultSet` object if you sent CQL that should return data, or a `SchemaChange` object if your query should have changed the CQL schema. It will never return both.

If you expect a ResultSet in your response, this library offers a utility method to convert it for you. You can then read rows, columns and values off the result set:

```typescript
// here value is the response in the gRPC callback function
const resultSet = toResultSet(value);
if (resultSet) {
  const rowsReturned = resultSet.getRowsList();
  rowsReturned.forEach(row, (index) => {
    const valuesInThisRow = row.getValuesList();
    const firstValueInRow = row.getValuesList()[0].getString(); // assume we know/expect this is a string value based on our query
    console.log(`First value in row ${index}: ${firstValueInRow}`);
  });
}
```

`toResultSet` will never throw; it will simply return `undefined` if it's unable to properly deserialize the value passed to it into a `ResultSet` object.

### Example uses

See the integration tests at `src/client/client.test.ts` for more example uses of this client. The [DEV_GUIDE.md](DEV_GUIDE.md) has instructions on how to run the integration tests locally as well.

## Issue Management

You can reference the [CONTRIBUTING.md](CONTRIBUTING.md) and [DEV_GUIDE.md](DEV_GUIDE.md) for a full description of how to get involved but the short of it is below.

- If you've found a bug (use the bug label) or want to request a new feature (use the enhancement label), file a GitHub issue
- If you're not sure about it or want to chat, reach out on the Stargate [Discord](https://discord.gg/GravUqY) or [mailing list](https://groups.google.com/a/lists.stargate.io/g/stargate-users)
