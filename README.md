# Stargate Node gRPC Client

This package lets Node applications communicate with [the Stargate data gateway](https://stargate.io/) via gRPC.

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
  stargateio/stargate-3_11:v1.0.29
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
