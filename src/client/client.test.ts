import {sendQuery} from "./client";
import {createTableBasedAuthClient} from "../auth/auth";
import {GenericContainer, StartedTestContainer} from "testcontainers";

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
            await container.stop();
        });

        it("supports basic queries", async () => {
            const authEndpoint = `http://${container.getHost()}:${container.getMappedPort(8081)}/v1/auth`;
            const authClient = createTableBasedAuthClient(authEndpoint, 'cassandra', 'cassandra');
            const token = await authClient.getAuthToken();
            expect(token).not.toBeUndefined();
        })
    })
})