import { StargateClient } from "../proto/stargate_grpc_pb";
import { Query, Response } from "../proto/query_pb";
import { CallOptions, Metadata, ServiceError } from "@grpc/grpc-js";

interface PromisifiedStargateClient {
  executeQuery(
    argument: Query,
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

        // At this point either one or the other is defined...
        const secondArgument = (metadata && metadata) || options;

        client.executeQuery(
          argument,
          secondArgument as Metadata | CallOptions,
          callback
        );
      });
    },
  };
};
