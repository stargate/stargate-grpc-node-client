/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.15.6
 * source: stargate.proto
 * git: https://github.com/thesayyn/protoc-gen-ts
 * buymeacoffee: https://www.buymeacoffee.com/thesayyn
 *  */
import * as dependency_1 from "./query";
import * as grpc_1 from "@grpc/grpc-js";
export namespace stargate {
    export abstract class UnimplementedStargateService {
        static definition = {
            ExecuteQuery: {
                path: "/stargate.Stargate/ExecuteQuery",
                requestStream: false,
                responseStream: false,
                requestSerialize: (message: dependency_1.stargate.Query) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => dependency_1.stargate.Query.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: dependency_1.stargate.Response) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => dependency_1.stargate.Response.deserialize(new Uint8Array(bytes))
            },
            ExecuteBatch: {
                path: "/stargate.Stargate/ExecuteBatch",
                requestStream: false,
                responseStream: false,
                requestSerialize: (message: dependency_1.stargate.Batch) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => dependency_1.stargate.Batch.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: dependency_1.stargate.Response) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => dependency_1.stargate.Response.deserialize(new Uint8Array(bytes))
            }
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract ExecuteQuery(call: grpc_1.ServerUnaryCall<dependency_1.stargate.Query, dependency_1.stargate.Response>, callback: grpc_1.requestCallback<dependency_1.stargate.Response>): void;
        abstract ExecuteBatch(call: grpc_1.ServerUnaryCall<dependency_1.stargate.Batch, dependency_1.stargate.Response>, callback: grpc_1.requestCallback<dependency_1.stargate.Response>): void;
    }
    export class StargateClient extends grpc_1.makeGenericClientConstructor(UnimplementedStargateService.definition, "Stargate", {}) {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>) {
            super(address, credentials, options)
        }
        ExecuteQuery(message: dependency_1.stargate.Query, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<dependency_1.stargate.Response>): grpc_1.ClientUnaryCall;
        ExecuteQuery(message: dependency_1.stargate.Query, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<dependency_1.stargate.Response>): grpc_1.ClientUnaryCall;
        ExecuteQuery(message: dependency_1.stargate.Query, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<dependency_1.stargate.Response>): grpc_1.ClientUnaryCall;
        ExecuteQuery(message: dependency_1.stargate.Query, callback: grpc_1.requestCallback<dependency_1.stargate.Response>): grpc_1.ClientUnaryCall;
        ExecuteQuery(message: dependency_1.stargate.Query, metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<dependency_1.stargate.Response>, options?: grpc_1.CallOptions | grpc_1.requestCallback<dependency_1.stargate.Response>, callback?: grpc_1.requestCallback<dependency_1.stargate.Response>): grpc_1.ClientUnaryCall {
            return super.ExecuteQuery(message, metadata, options, callback);
        }
        ExecuteBatch(message: dependency_1.stargate.Batch, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<dependency_1.stargate.Response>): grpc_1.ClientUnaryCall;
        ExecuteBatch(message: dependency_1.stargate.Batch, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<dependency_1.stargate.Response>): grpc_1.ClientUnaryCall;
        ExecuteBatch(message: dependency_1.stargate.Batch, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<dependency_1.stargate.Response>): grpc_1.ClientUnaryCall;
        ExecuteBatch(message: dependency_1.stargate.Batch, callback: grpc_1.requestCallback<dependency_1.stargate.Response>): grpc_1.ClientUnaryCall;
        ExecuteBatch(message: dependency_1.stargate.Batch, metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<dependency_1.stargate.Response>, options?: grpc_1.CallOptions | grpc_1.requestCallback<dependency_1.stargate.Response>, callback?: grpc_1.requestCallback<dependency_1.stargate.Response>): grpc_1.ClientUnaryCall {
            return super.ExecuteBatch(message, metadata, options, callback);
        }
    }
}