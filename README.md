# Stargate Node gRPC Client

This package lets Node applications communicate with [the Stargate data gateway](https://stargate.io/) via gRPC.

## Protobuf definition files

The definition files in the `proto/` directory are copied from [the Stargate repository](https://github.com/stargate/stargate/tree/master/grpc-proto/proto)



### Notes

- Suggestions on how to promisify, so we don't need to use callbacks: https://github.com/grpc/grpc-node/issues/54
- proto loader can generate TS types - where to put them? https://www.npmjs.com/package/@grpc/proto-loader

- The `gen` script uses [grpc-tools](https://github.com/grpc/grpc-node/tree/master/packages/grpc-tools) with [the ts-protoc-gen plugin](https://github.com/improbable-eng/ts-protoc-gen) to generate files. Unfortunately, we have a type/message in query.proto called `Map`. The ts compiler freaks out on the generated TS file because of this.


### TODO

- Solve the `Map` problem, so we can safely generate TS files for the actual SG protobuf
    - might need to file an issue in the library: https://github.com/improbable-eng/ts-protoc-gen
- Write an `isgRPCError` type guard, so our promisified catch blocks can check if they're working with an error and log/throw appropriately
- Update client to send a hard-coded SG gRPC query. Hardcode the auth token in the metadata as well
- 