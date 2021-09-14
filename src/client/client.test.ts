import {creategRPCClient} from "./client";
import {createTableBasedAuthClient} from "../auth/auth";
import {GenericContainer, StartedTestContainer} from "testcontainers";
import {stargate as proto} from "../proto/query";
import * as grpc from '@grpc/grpc-js';

describe('Stargate gRPC client integration tests', ()=> {
    jest.setTimeout(40000);
    describe('sendQuery', () => {
        let container: StartedTestContainer;
        let authEndpoint: string;
        let grpcEndpoint: string;
        
        beforeAll(async () => {
            container = await new GenericContainer("stargateio/stargate-3_11:v1.0.32")
                .withEnv("CLUSTER_NAME", "test")
                .withEnv("CLUSTER_VERSION", "3.11")
                .withEnv("DEVELOPER_MODE", "true")
                .withEnv("ENABLE_AUTH", "true")
                .withExposedPorts(8081, 8084, 8090)
                // TODO: set a waiting strategy
                .start();

                const containerHost = container.getHost();
                authEndpoint = `http://${containerHost}:${container.getMappedPort(8081)}/v1/auth`;
                grpcEndpoint = `${containerHost}:${container.getMappedPort(8090)}`;
        });

        afterAll(async () => {
            if (container) {
                await container.stop();
            }
        });

        it("supports basic queries", async () => {
            const authConfig = {
                serviceURL: authEndpoint,
                username: 'cassandra',
                password: 'cassandra'
            };
            
            const authClient = createTableBasedAuthClient(authConfig);

            const grpcConfig = {
                address: grpcEndpoint,
                credentials: grpc.credentials.createInsecure()
            }

            const grpcClient = creategRPCClient(authClient, grpcConfig);

            const query = new proto.Query({cql: 'select * from system.local'});

            const result = await grpcClient.executeQuery(query);
            expect(result).not.toBeFalsy();
        })
    })
})