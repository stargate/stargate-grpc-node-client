# Stargate Node gRPC Client

This package lets Node applications communicate with [the Stargate data gateway](https://stargate.io/) via gRPC.

## Protobuf definition files

The definition files in the `proto/` directory are copied from [the Stargate repository](https://github.com/stargate/stargate/tree/master/grpc-proto/proto)

## Running locally

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


### TODO

- The `gen` script uses [grpc-tools](https://github.com/grpc/grpc-node/tree/master/packages/grpc-tools) with [the ts-protoc-gen plugin](https://github.com/improbable-eng/ts-protoc-gen) to generate files. Unfortunately, we have a type/message in query.proto called `Map`. The ts compiler freaks out on the generated TS file because of this - it can't tell the different in the generated file between that `Map` and the built-in generic in TS.
  - My temporary solution was to just rename `Map` -> `MapFixMe`, but obviously that's not production-ready. Need to actually solve this.
  - May need to file an issue in the ts-protoc-gen-library: https://github.com/improbable-eng/ts-protoc-gen
- Add error handling to the auth and client
- Add documentation for example use cases (bonus for a separate repo that imports the library and uses it)
- Write an `isgRPCError` type guard, so our promisified catch blocks can check if they're working with an error and log/throw appropriately
- Implement batch function
- Unit test the auth and client
- Split out unit and integration tests
- Add some GH workflow config to run tests on push
- Move promisification outside client creation
- Add more integration tests based on Go library
- Add some code quality stuff like a linter
- Offer both callback and promise-based options for client methods (do we need this, or can we just wait to see if anyone asks for it?)