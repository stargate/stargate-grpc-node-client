# Stargate Node gRPC Client

This package lets Node applications communicate with [the Stargate data gateway](https://stargate.io/) via gRPC.

## Installing

Using NPM:

`npm i @stargate/stargate-grpc-node-client`

Using Yarn:

`yarn add @stargate/stargate-grpc-node-client`

## Example use

Use the following Docker command to run Stargate locally in developer mode and expose port 8090 for gRPC connections:

```bash
docker run --name stargate \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8082:8082 \
  -p 8090:8090 \
  -p 127.0.0.1:9042:9042 \
  -d \
  -e CLUSTER_NAME=stargate \
  -e CLUSTER_VERSION=3.11 \
  -e DEVELOPER_MODE=true \
  stargateio/stargate-3_11:v1.0.32
```

Ensure the local instance of Stargate is running properly by tailing the logs for the container with `docker logs -f stargate`. When you see this message, Stargate is ready for traffic:

`Finished starting bundles.`

Now make a gRPC call in your code:

```typescript
// TODO: fill this in when it's pretty
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

### Reading primitive values

Individual values from queries will be returned as a `Value` object. These objects have boolean `hasX()` methods, where X is the possible type of a value.

There are corresponding `getX()` methods on the `Value` type that will return the value, if present. If the value does not represent type X, calling `getX()` will not return an error. You'll get `undefined` or another falsy value based on the expected data type.

```typescript
const firstValueInRow = row.getValuesList()[0]; // Assume we know this is a string

const isString = firstValueInRow.hasString(); // will resolve to true
const stringValue = firstValueInRow.getString(); // will resolve to the string value

const isInt = firstValueInRow.hasInt(); // false
const intValue = firstValueInRow.getInt(); // 0 - zero value for this data type
```

## Issue Management

You can reference the [CONTRIBUTING.md](CONTRIBUTING.md) and [DEV_GUIDE.md](DEV_GUIDE.md) for a full description of how to get involved but the short of it is below.

- If you've found a bug (use the bug label) or want to request a new feature (use the enhancement label), file a GitHub issue
- If you're not sure about it or want to chat, reach out on the Stargate [Discord](https://discord.gg/GravUqY) or [mailing list](https://groups.google.com/a/lists.stargate.io/g/stargate-users)
