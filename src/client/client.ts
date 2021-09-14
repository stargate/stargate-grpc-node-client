import * as grpc from '@grpc/grpc-js';

import { stargate } from '../proto/stargate';
import {stargate as stargateQuery} from "../proto/query";
import { AuthClient } from '../auth/auth';

export interface grpcClient {
    executeQuery: (query: stargateQuery.Query) => Promise<stargateQuery.Response>;
}

interface ClientConfig {
    address: string;
    credentials: grpc.ChannelCredentials;
    options?: Partial<grpc.ChannelOptions>;
}

export const creategRPCClient = (authClient: AuthClient, config: ClientConfig): grpcClient => {
    const {address, credentials, options} = config;
    const client = new stargate.StargateClient(address, credentials, options);

    const executeQueryAsPromise = (message: stargateQuery.Query, metadata: grpc.Metadata) => {
        return new Promise((resolve, reject) => {
            client.ExecuteQuery(message, metadata, (error, value) => {
                if (error) reject (error);
                resolve(value);
            })            
        })
    }
    
    return {
        executeQuery: async (query: stargateQuery.Query) => {
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
                return response as stargateQuery.Response;
            } catch (e) {
                const error = e as grpc.ServiceError;
                throw e;
            }
        }
    }
}

export const toResultSet = (response: stargateQuery.Response): stargateQuery.ResultSet => {
    const {result_set: resultSet} = response;
    const data = resultSet.data;
    // TODO: will this ever throw? How do we know it's legit?
    const test = stargateQuery.ResultSet.deserialize(data.value);
    return test;
}