# Stargate Node gRPC Client

This package provides the ability for Node applications to communicate with the [Stargate data gateway](https://stargate.io/) via gRPC.

**Note: This package is for use in applications running on Node servers, NOT gRPC web clients running in browsers.**

- [Quick start guide](#quick-start-guide)
  * [Connecting](#connecting)
  * [Authentication](#authentication)
    + [Generating authentication metadata](#generating-authentication-metadata)
  * [Querying](#querying)
  * [Processing the result set](#processing-the-result-set)
    + [Reading primitive values](#reading-primitive-values)
    + [Reading CQL data types](#reading-cql-data-types)
  * [Promise support](#promise-support)
  * [Example uses](#example-uses)
- [Issue Management](#issue-management)

## Quick start guide

To begin, you'll need to add the necessary dependency to your project:

Using NPM:

```shell
npm i @stargate-oss/stargate-grpc-node-client
```

Using Yarn:

```shell
yarn add @stargate-oss/stargate-grpc-node-client
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
  stargateio/stargate-3_11:v1.0.40
```

Ensure the local instance of Stargate is running properly by tailing the logs for the container with `docker logs -f stargate`. When you see this message, Stargate is ready for traffic:

`Finished starting bundles.`

### Connecting

To connect to your Stargate instance set up the client as follows. This example assumes that you're running Stargate locally
with the default credentials of `cassandra/cassandra`. For more information regarding authentication please see the
[Stargate authentication and authorization docs](https://stargate.io/docs/stargate/1.0/developers-guide/authnz.html).

```typescript
import * as grpc from "@grpc/grpc-js";
import { StargateClient, StargateTableBasedToken, Query, Response, promisifyStargateClient } from "@stargate-oss/stargate-grpc-node-client";

// Create a client for Stargate/Cassandra authentication using the default C* username and password
const creds = new StargateTableBasedToken({authEndpoint: 'http://localhost:8081/v1/auth', username: 'cassandra', password: 'cassandra'});

// Create the gRPC client, passing it the address of the gRPC endpoint
const stargateClient = new StargateClient('localhost:8090', grpc.credentials.createInsecure());

// Create a promisified version of the client, so we don't need to use callbacks
const promisifiedClient = promisifyStargateClient(stargateClient);
```

### Authentication

This client supports both table-based and JWT-based authentication to Stargate.

For table-based auth, use the `StargateTableBasedToken` class:

```typescript
const tableBasedToken = new StargateTableBasedToken({authEndpoint: 'http://localhost:8081/v1/auth', username: 'cassandra', password: 'cassandra'});
```

For JWT-based auth, use the `StargateBearerToken` class and pass your token in directly:

```typescript
const bearerToken = new StargateBearerToken('my-token');
```

#### Generating authentication metadata

If you're connecting to Stargate through insecure gRPC credentials - e.g. to a local Stargate instance - you must manually generate metadata for each call, like so:

```typescript
const stargateClient = new StargateClient(grpcEndpoint, grpc.credentials.createInsecure());

const promisifiedClient = promisifyStargateClient(stargateClient);

const authenticationMetadata = await creds.generateMetadata({service_url: 'http://localhost:8081/v1/auth'});
await promisifiedClient.executeQuery(query, authenticationMetadata);
```

This is because the Node gRPC implementation [does not allow composing insecure credentials.](https://github.com/grpc/grpc-node/issues/543)

However, if you're using secure gRPC credentials - e.g. connecting to a remote Stargate instance like an Astra database - you can simply include the token metadata generator when constructing the client. The metadata will automatically be generated on every call to the client:

```typescript
const bearerToken = new StargateBearerToken('my-token');
const credentials = grpc.credentials.combineChannelCredentials(grpc.credentials.createSsl(), bearerToken);

const stargateClient = new StargateClient(grpcEndpoint, credentials);
const promisifiedClient = promisifyStargateClient(stargateClient);

// No need to pass metadata; the credentials passed to the client constructor will do that for us
await promisifiedClient.executeQuery(query);
```

The examples in this README are designed to work with a local Stargate instance, so they use the insecure approach.

### Querying

A simple query can be performed by passing a CQL query to the client:

```typescript
const query = new Query();
query.setCql('select cluster_name from system.local');

// Must manually generate auth metadata if using insecure creds - see authentication section above for details
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

const keyspaceNameValue = new Value();
keyspaceNameValue.setString("system");

const queryValues = new Values();
queryValues.setValuesList([keyspaceNameValue]);

query.setValues(queryValues);

const queryParameters = new QueryParameters();
queryParameters.setTracing(false);
queryParameters.setSkipMetadata(false);

query.setParameters(queryParameters);

const response = await promisifiedClient.executeQuery(query, metadata);
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

After executing a query a response will be returned containing rows for a SELECT statement, otherwise the returned payload will be unset. You can call `getResultSet()` on the response to grab a ResultSet that's easier to work with. Note the function can return `undefined` if no ResultSet was returned, so you'll need to check it's defined or cast it.

```typescript
// Insert a record into the table
const insert = new Query();
insert.setCql("INSERT INTO ks1.tbl2 (key, value) VALUES ('a', 'alpha');");
await promisifiedClient.executeQuery(insert, authenticationMetadata);

// Read the data back out
const read = new Query();
read.setCql("SELECT key, value FROM ks1.tbl2");
const result = await promisifiedClient.executeQuery(read, authenticationMetadata);

const resultSet = result.getResultSet();

if (resultSet) {
  const firstRow = resultSet.getRowsList()[0];
  // We call getString() here because we know the type being returned. See below for details on working with types.
  const key = firstRow.getValuesList()[0].getString();
  console.log(`key: ${key}`);
}
```

#### Reading primitive values

Individual values from queries will be returned as a `Value` object. These objects have boolean `hasX()` methods, where X is the possible type of a value.

There are corresponding `getX()` methods on the `Value` type that will return the value, if present. If the value does not represent type X, calling `getX()` will not throw an error. You'll get `undefined` or another falsy value based on the expected data type.

```typescript
const firstValueInRow = row.getValuesList()[0]; // Assume we know this is a string

const isString = firstValueInRow.hasString(); // will resolve to true
const stringValue = firstValueInRow.getString(); // will resolve to the string value

const isInt = firstValueInRow.hasInt(); // false
const intValue = firstValueInRow.getInt(); // 0 - zero value for this data type
```

#### Reading CQL data types

The built-in `toX()` methods for `Value`s representing more complicated types like UUIDs can be hard to work with. This library exposes helper functions to translate a `Value` into a more easily used type:

- `toUUIDString`
- `toCQLTime`

Unlike the built-in `toX()` methods, these helper functions _will_ throw an error if the conversion fails.

Here's an example of processing a UUID:

```typescript
const insert = new Query();
insert.setCql("INSERT INTO ks1.tbl2 (id) VALUES (f066f76d-5e96-4b52-8d8a-0f51387df76b);");
await promisifiedClient.executeQuery(insert, authenticationMetadata);

// Read the data back out
const read = new Query();
read.setCql("SELECT id FROM ks1.tbl2");
const result = await promisifiedClient.executeQuery(read, authenticationMetadata);

const resultSet = result.getResultSet();

if (resultSet) {
  const firstRow = resultSet.getRowsList()[0];
  const idValue = firstRow.getValuesList()[0];
  try {
  const uuidAsString = toUUIDString(idValue);
  console.log(`UUID: ${uuidAsString}`);
  } catch (e) {
    console.error(`Conversion of Value to UUID string failed: ${e}`);
  }
}
```

### Promise support

The Node gRPC implementation uses callbacks by default. If you'd prefer promises, this library provides a utility function to create a promisified version of the Stargate gRPC client. The promise will reject if an error occurs:

```typescript
import {
  StargateClient,
  promisifyStargateClient,
} from "@stargate-oss/stargate-grpc-node-client";

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

### Example uses

See the integration tests at `src/client/client.test.ts` for more example uses of this client. The [DEV_GUIDE.md](DEV_GUIDE.md) has instructions on how to run the integration tests locally as well.

## Issue Management

You can reference the [CONTRIBUTING.md](CONTRIBUTING.md) and [DEV_GUIDE.md](DEV_GUIDE.md) for a full description of how to get involved but the short of it is below.

- If you've found a bug (use the bug label) or want to request a new feature (use the enhancement label), file a GitHub issue
- If you're not sure about it or want to chat, reach out on our [Discord](https://discord.gg/GravUqY) or [mailing list](https://groups.google.com/a/lists.stargate.io/g/stargate-users)
- If you want to write some user docs 🎉 head over to the [stargate/docs](https://github.com/stargate/docs) repo, Pull Requests accepted!