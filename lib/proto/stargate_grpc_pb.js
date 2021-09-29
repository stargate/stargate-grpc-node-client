// GENERATED CODE -- DO NOT EDIT!
// Original file comments:
//
// Copyright The Stargate Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
'use strict';
var grpc = require('@grpc/grpc-js');
var query_pb = require('./query_pb.js');
function serialize_stargate_Batch(arg) {
    if (!(arg instanceof query_pb.Batch)) {
        throw new Error('Expected argument of type stargate.Batch');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_stargate_Batch(buffer_arg) {
    return query_pb.Batch.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_stargate_Query(arg) {
    if (!(arg instanceof query_pb.Query)) {
        throw new Error('Expected argument of type stargate.Query');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_stargate_Query(buffer_arg) {
    return query_pb.Query.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_stargate_Response(arg) {
    if (!(arg instanceof query_pb.Response)) {
        throw new Error('Expected argument of type stargate.Response');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_stargate_Response(buffer_arg) {
    return query_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}
// The gPRC service to interact with a Stargate coordinator.
var StargateService = exports.StargateService = {
    // Executes a single CQL query.
    executeQuery: {
        path: '/stargate.Stargate/ExecuteQuery',
        requestStream: false,
        responseStream: false,
        requestType: query_pb.Query,
        responseType: query_pb.Response,
        requestSerialize: serialize_stargate_Query,
        requestDeserialize: deserialize_stargate_Query,
        responseSerialize: serialize_stargate_Response,
        responseDeserialize: deserialize_stargate_Response,
    },
    // Executes a batch of CQL queries.
    executeBatch: {
        path: '/stargate.Stargate/ExecuteBatch',
        requestStream: false,
        responseStream: false,
        requestType: query_pb.Batch,
        responseType: query_pb.Response,
        requestSerialize: serialize_stargate_Batch,
        requestDeserialize: deserialize_stargate_Batch,
        responseSerialize: serialize_stargate_Response,
        responseDeserialize: deserialize_stargate_Response,
    },
};
exports.StargateClient = grpc.makeGenericClientConstructor(StargateService);
