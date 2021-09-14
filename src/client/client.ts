import * as grpc from '@grpc/grpc-js';
import * as util from "util";

import { helloworld } from "../proto/greeter";
import { stargate } from '../proto/stargate';
import {stargate as stargateQuery} from "../proto/query";
import { AuthClient } from '../auth/auth';

export interface grpcClient {
    executeQuery: (query: stargateQuery.Query) => Promise<stargateQuery.Response>;
}

// TODO: this should take a config object, not the last three params separately
export const creategRPCClient = (authClient: AuthClient, address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ChannelOptions>): grpcClient => {
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


export const sendQuery = async (query: stargateQuery.Query, token: string) => {
    const stargateClient = new stargate.StargateClient("localhost:8090", grpc.credentials.createInsecure());

    const metadata = new grpc.Metadata();

    metadata.set('x-cassandra-token', token);

    stargateClient.ExecuteQuery(query, metadata, {}, (error, value) => {
        if (error) {
            console.dir(error);
        }

        if (value) {
            const resultSet = value.result_set;
            console.dir(resultSet);
        }
    })
}

export const sendMessage = async () => {
    const client = new helloworld.GreeterClient('localhost:50051', grpc.credentials.createInsecure());


    const message = new helloworld.HelloRequest({name: 'foo'});

    const promisified = util.promisify(client.SayHello).bind(client);

    try {
        const response = await promisified(message);
        console.dir(response?.message);
    } catch (e) {
        const error = e as grpc.ServiceError;
        console.dir(error);
    }

    client.SayHello(message, (error, data) => {
        if (error) {
            console.dir(error);
        }
    
        if (data) {
            console.log(data.message);
        }
    })
}
