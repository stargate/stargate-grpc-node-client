import * as grpc from '@grpc/grpc-js';

import { helloworld } from "../proto/greeter";

const client = new helloworld.GreeterClient('localhost:50051', grpc.credentials.createInsecure());

export const sendMessage = () => {
    const message = new helloworld.HelloRequest({name: 'foo'});

    client.SayHello(message, (error, data) => {
        if (error) {
            console.dir(error);
        }
    
        if (data) {
            console.log(data.message);
        }
    })
}
