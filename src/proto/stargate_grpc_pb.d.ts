// GENERATED CODE -- DO NOT EDIT!

// package: stargate
// file: stargate.proto

import * as stargate_pb from "./stargate_pb";
import * as query_pb from "./query_pb";
import * as grpc from "@grpc/grpc-js";

interface IStargateService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  executeQuery: grpc.MethodDefinition<query_pb.Query, query_pb.Response>;
  executeBatch: grpc.MethodDefinition<query_pb.Batch, query_pb.Response>;
}

export const StargateService: IStargateService;

export interface IStargateServer extends grpc.UntypedServiceImplementation {
  executeQuery: grpc.handleUnaryCall<query_pb.Query, query_pb.Response>;
  executeBatch: grpc.handleUnaryCall<query_pb.Batch, query_pb.Response>;
}

export class StargateClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  executeQuery(argument: query_pb.Query, callback: grpc.requestCallback<query_pb.Response>): grpc.ClientUnaryCall;
  executeQuery(argument: query_pb.Query, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<query_pb.Response>): grpc.ClientUnaryCall;
  executeQuery(argument: query_pb.Query, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<query_pb.Response>): grpc.ClientUnaryCall;
  executeBatch(argument: query_pb.Batch, callback: grpc.requestCallback<query_pb.Response>): grpc.ClientUnaryCall;
  executeBatch(argument: query_pb.Batch, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<query_pb.Response>): grpc.ClientUnaryCall;
  executeBatch(argument: query_pb.Batch, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<query_pb.Response>): grpc.ClientUnaryCall;
}
