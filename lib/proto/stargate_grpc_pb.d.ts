export namespace StargateService {
    namespace executeQuery {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof query_pb.Query;
        export const responseType: typeof query_pb.Response;
        export { serialize_stargate_Query as requestSerialize };
        export { deserialize_stargate_Query as requestDeserialize };
        export { serialize_stargate_Response as responseSerialize };
        export { deserialize_stargate_Response as responseDeserialize };
    }
    namespace executeBatch {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof query_pb.Batch;
        export { requestType_1 as requestType };
        const responseType_1: typeof query_pb.Response;
        export { responseType_1 as responseType };
        export { serialize_stargate_Batch as requestSerialize };
        export { deserialize_stargate_Batch as requestDeserialize };
        export { serialize_stargate_Response as responseSerialize };
        export { deserialize_stargate_Response as responseDeserialize };
    }
}
export var StargateClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
import query_pb = require("./query_pb.js");
declare function serialize_stargate_Query(arg: any): Buffer;
declare function deserialize_stargate_Query(buffer_arg: any): query_pb.Query;
declare function serialize_stargate_Response(arg: any): Buffer;
declare function deserialize_stargate_Response(buffer_arg: any): query_pb.Response;
declare function serialize_stargate_Batch(arg: any): Buffer;
declare function deserialize_stargate_Batch(buffer_arg: any): query_pb.Batch;
export {};
//# sourceMappingURL=stargate_grpc_pb.d.ts.map