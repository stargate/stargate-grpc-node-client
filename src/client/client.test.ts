import {creategRPCClient} from "./client";
import {createTableBasedAuthClient} from "../auth/auth";
import {GenericContainer, StartedTestContainer} from "testcontainers";
import {stargate as proto} from "../proto/query";
import * as grpc from '@grpc/grpc-js';

describe('Stargate gRPC client', ()=> {
    // TODO: make sure this is set only for this test suite
    jest.setTimeout(40000);
    describe('sendQuery', () => {
        let container: StartedTestContainer;
        
        beforeAll(async () => {
            container = await new GenericContainer("stargateio/stargate-3_11:v1.0.32")
                .withEnv("CLUSTER_NAME", "test")
                .withEnv("CLUSTER_VERSION", "3.11")
                .withEnv("DEVELOPER_MODE", "true")
                .withEnv("ENABLE_AUTH", "true")
                .withExposedPorts(8081, 8084, 8090)
                // TODO: set a waiting strategy
                .start();
        });

        afterAll(async () => {
            if (container) {
                await container.stop();
            }
        });

        it("supports basic queries", async () => {
            const authEndpoint = `http://${container.getHost()}:${container.getMappedPort(8081)}/v1/auth`;
            const authConfig = {
                serviceURL: authEndpoint,
                username: 'cassandra',
                password: 'cassandra'
            };
            const authClient = createTableBasedAuthClient(authConfig);

            const grpcEndpoint = `${container.getHost()}:${container.getMappedPort(8090)}`;
            const grpcClient = creategRPCClient(authClient, grpcEndpoint, grpc.credentials.createInsecure());

            const query = new proto.Query({cql: 'select * from system.local'});

            const result = await grpcClient.executeQuery(query);
            expect(result).not.toBeFalsy();
        })
    })
})