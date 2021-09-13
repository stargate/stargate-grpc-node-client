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


### Notes

- Suggestions on how to promisify, so we don't need to use callbacks: https://github.com/grpc/grpc-node/issues/54
- proto loader can generate TS types - where to put them? https://www.npmjs.com/package/@grpc/proto-loader

- The `gen` script uses [grpc-tools](https://github.com/grpc/grpc-node/tree/master/packages/grpc-tools) with [the ts-protoc-gen plugin](https://github.com/improbable-eng/ts-protoc-gen) to generate files. Unfortunately, we have a type/message in query.proto called `Map`. The ts compiler freaks out on the generated TS file because of this.


### TODO

- Solve the `Map` problem, so we can safely generate TS files for the actual SG protobuf
    - might need to file an issue in the library: https://github.com/improbable-eng/ts-protoc-gen
- Write an `isgRPCError` type guard, so our promisified catch blocks can check if they're working with an error and log/throw appropriately
- Update client to send a hard-coded SG gRPC query. Hardcode the auth token in the metadata as well
- Is `grpc.credentials.createInsecure()` the right way to generate production-ready creds? The name tells me no; we may want to use the metadata generator option to generate the metadata with auth token rather than do it separately
    - Auth details: https://grpc.io/docs/guides/auth/
    - Actually, should we just take the already-configured client from the `new stargate.StargateClient` call? Shouldn't it be up to the user to handle creating the connection, since we can't easily account for various authentication schemes?
        - If we do it this way they'd need to generate the proto files themselves. Is that a problem? Would they need to do that with the other language clients?