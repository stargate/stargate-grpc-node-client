import * as grpc from '@grpc/grpc-js';

import { StargateClient } from '../proto/stargate_grpc_pb';
import { Query, Response, ResultSet } from '../proto/query_pb';
import { AuthClient } from '../auth/auth';

export interface grpcClient {
    executeQuery: (query: Query) => Promise<Response>;
}

interface ClientConfig {
    address: string;
    credentials: grpc.ChannelCredentials;
    options?: Partial<grpc.ChannelOptions>;
}

export const creategRPCClient = (authClient: AuthClient, config: ClientConfig): grpcClient => {
    const {address, credentials, options} = config;
    const client = new StargateClient(address, credentials, options);

    const executeQueryAsPromise = (message: Query, metadata: grpc.Metadata) => {
        return new Promise((resolve, reject) => {
            client.executeQuery(message, metadata, (error, value) => {
                if (error) reject (error);
                resolve(value);
            })            
        })
    }
    
    return {
        executeQuery: async (query: Query) => {
            let authToken: string;
            try {
                authToken = await authClient.getAuthToken();
            } catch (e) {
                throw e;
            }

            const metadata = new grpc.Metadata();
            metadata.set('x-cassandra-token', authToken);

            try {
                const response = await executeQueryAsPromise(query, metadata);
                return response as Response;
            } catch (e) {
                const error = e as grpc.ServiceError;
                throw e;
            }
        }
    }
}

export const toResultSet = (response: Response): ResultSet => {
    const resultSet = response.getResultSet();
    const data = resultSet?.getData();
    // TODO: will this ever throw? How do we know it's legit?
    const test = ResultSet.deserializeBinary(data?.getValue() as Uint8Array);
    return test;
}