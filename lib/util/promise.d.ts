import { StargateClient } from "../proto/stargate_grpc_pb";
import { Batch, Query, Response } from "../proto/query_pb";
import { CallOptions, Metadata } from "@grpc/grpc-js";
export interface PromisifiedStargateClient {
  executeQuery(
    argument: Query,
    metadata?: Metadata,
    options?: CallOptions
  ): Promise<Response>;
  executeBatch(
    argument: Batch,
    metadata?: Metadata,
    options?: CallOptions
  ): Promise<Response>;
}
export declare const promisifyStargateClient: (
  client: StargateClient
) => PromisifiedStargateClient;
//# sourceMappingURL=promise.d.ts.map
