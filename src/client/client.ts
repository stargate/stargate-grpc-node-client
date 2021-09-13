import * as grpc from '@grpc/grpc-js';
import * as util from "util";

import { helloworld } from "../proto/greeter";
import { stargate } from '../proto/stargate';
import {stargate as stargateQuery} from "../proto/query";



// export interface CallOptions {
//     deadline?: Deadline;
//     host?: string;
//     parent?: ServerUnaryCall<any, any> | ServerReadableStream<any, any> | ServerWritableStream<any, any> | ServerDuplexStream<any, any>;
//     propagate_flags?: number;
//     credentials?: CallCredentials;
//     interceptors?: Interceptor[];
//     interceptor_providers?: InterceptorProvider[];
// }

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
