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
const stargateCallCredentials = new TableBasedCallCredentials({username: 'cassandra', password: 'cassandra'});

try {
  const stargateAuthMetadata = await stargateCallCredentials.generateMetadata({service_url: 'http://localhost:8081/v1/auth'});
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
const stargateClient = new StargateClient('localhost:8090', grpc.credentials.createInsecure());
```

The client follows the `@grpc/grpc-js` callback style for sending queries and batches:

```typescript
stargateClient.executeQuery(query, authenticationMetadata, (error: grpc.ServiceError | null, value?: Response) => {
  if (error) {
    // something went wrong
  } if (value) {
    // the call succeeded
  }
});
```

### Working with responses

A response will contain a `ResultSet` object if you sent CQL that should return data, or a `SchemaChange` object if your query should have changed the CQL schema. It will never return both.

If you expect a ResultSet in your response, this library offers a utility method to convert it for you. You can then read rows, columns and values off the result set:

```typescript
// here value is the response in the gRPC callback function
const resultSet = toResultSet(value);
if (resultSet) {
  const rowsReturned = resultSet.getRowsList();
  rowsReturned.forEach(row, index => {
    const valuesInThisRow = row.getValuesList();
    const firstValueInRow = row.getValuesList()[0].getString(); // assume we know/expect this is a string value based on our query
    console.log(`First value in row ${index}: ${firstValueInRow}`);
  })
}
```

`toResultSet` will never throw; it will simply return `undefined` if it's unable to properly deserialize the value passed to it into a `ResultSet` object.

## Protobuf definition files

The definition files in the `proto/` directory are copied from [the Stargate repository](https://github.com/stargate/stargate/tree/master/grpc-proto/proto)

## Running tests

`npm run test` will run integration tests that exercise the gRPC client.

## Running Stargate locally

User the following Docker command to run Stargate locally in developer mode and map your machine's port 8090 to the container's ([Stargate uses 8090 as the default gRPC server port](https://github.com/stargate/stargate/blob/master/grpc/src/main/java/io/stargate/grpc/impl/GrpcImpl.java#L64)):

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

Once the container is running, use this command to get an auth token:

```bash
curl -L -X POST 'http://localhost:8081/v1/auth' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "username": "cassandra",
    "password": "cassandra"
}'
```

### Questions for demo

- The Go library offers value-mapping functions like `toInt`, `toString`, etc. for the `Value` type. But the GRPC JS library autogenerates `hasInt`, `hasString`, etc. methods on that type, _and_ if you call `toX` on a Value that's not an x, it just returns you a falsy value like `undefined`. Do we still want/need value-mapping functions for the JS library?
  - At least the UUID type will need this; `getUUID()` returns an object like `{"array": [17322805065837595000, 10198981147648457000], "arrayIndexOffset_": -1, "convertedPrimitiveFields_": {}, "messageId_": undefined, "pivot_": 1.7976931348623157e+308, "wrappers_": null}` - need to do the MSB and LSB work like the Go client
  - Also for converting blobs back to strings


### TODO

- The `gen` script uses [grpc-tools](https://github.com/grpc/grpc-node/tree/master/packages/grpc-tools) with [the ts-protoc-gen plugin](https://github.com/improbable-eng/ts-protoc-gen) to generate files, including TS definition files. This uses a not-super-idiomatic getter/setter convention. There's another library, [protoc-gen-ts](https://github.com/thesayyn/protoc-gen-ts), that generates TS files directly (instead of JS with definition files). This is more idiomatic but it doesn't support our current proto file, because it chokes when given a file with a `Map` message type and other messages that use the primitive `map` type. [I've opened an issue](https://github.com/thesayyn/protoc-gen-ts/issues/88) but have yet to hear back.
- Add error handling to the auth and client
- Add documentation for example use cases (bonus for a separate repo that imports the library and uses it)

- Implement batch function
- Unit test the auth and client
- Split out unit and integration tests

- Add some GH workflow config to run tests on push


- Add more integration tests based on Go library
- Add some code quality stuff like a linter
