import * as grpc from '@grpc/grpc-js';
import * as util from "util";

import { helloworld } from "../proto/greeter";

const client = new helloworld.GreeterClient('localhost:50051', grpc.credentials.createInsecure());

export const sendMessage = async () => {
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
