import { StargateClient } from "../proto/stargate_grpc_pb";
import { Batch, Query, Response } from "../proto/query_pb";
import { CallOptions, Metadata, ServiceError } from "@grpc/grpc-js";

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

export const promisifyStargateClient = (
  client: StargateClient
): PromisifiedStargateClient => {
  return {
    executeQuery(
      argument: Query,
      metadata?: Metadata,
      options?: CallOptions
    ): Promise<Response> {
      return new Promise((resolve, reject) => {
        const callback = (error: ServiceError | null, value?: Response) => {
          if (error) reject(error);
          if (value) resolve(value);
        };

        if (!metadata && !options) {
          client.executeQuery(argument, callback);
        }

        if (metadata && options) {
          client.executeQuery(argument, metadata, options, callback);
        }

        if (metadata && !options) {
          client.executeQuery(argument, metadata, callback);
        }

        if (!metadata && options) {
          client.executeQuery(argument, options, callback);
        }
      });
    },
    executeBatch(
      argument: Batch,
      metadata?: Metadata,
      options?: CallOptions
    ): Promise<Response> {
      return new Promise((resolve, reject) => {
        const callback = (error: ServiceError | null, value?: Response) => {
          if (error) reject(error);
          if (value) resolve(value);
        };

        if (!metadata && !options) {
          client.executeBatch(argument, callback);
        }

        if (metadata && options) {
          client.executeBatch(argument, metadata, options, callback);
        }

        if (metadata && !options) {
          client.executeBatch(argument, metadata, callback);
        }

        if (!metadata && options) {
          client.executeBatch(argument, options, callback);
        }
      });
    },
  };
};
