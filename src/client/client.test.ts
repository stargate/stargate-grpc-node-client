import {sendQuery} from "./client";
import {GenericContainer, StartedTestContainer} from "testcontainers";

describe('Stargate gRPC client', ()=> {
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
                .start();
        });

        afterAll(async () => {
            await container.stop();
        });

        it("is a test", () => {
            expect(true).toBe(true);
        })
    })
})