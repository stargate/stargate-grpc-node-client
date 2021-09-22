import {toResultSet} from "./client";
import {TableBasedCallCredentials} from "../auth/auth";
import {GenericContainer, StartedTestContainer} from "testcontainers";
import { Query, Response} from '../proto/query_pb';
import * as grpc from '@grpc/grpc-js';
import { StargateClient } from "../proto/stargate_grpc_pb";

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
            const tableBasedCallCredentials = new TableBasedCallCredentials('cassandra', 'cassandra');
            const metadata = await tableBasedCallCredentials.generateMetadata({service_url: authEndpoint});

            const stargateClient = new StargateClient(grpcEndpoint, grpc.credentials.createInsecure());

            const query = new Query();
            query.setCql('select * from system.local');

            const promisifiedQuery = executeQueryPromisified(stargateClient);

            const response = await promisifiedQuery(query, metadata) as Response;

            const resultSet = toResultSet(response);
            expect(resultSet.getColumnsList().length).toEqual(18);
            const rowList = resultSet.getRowsList();
            expect(rowList.length).toEqual(1);
            const firstRow = rowList[0];
            const firstRowValues = firstRow.getValuesList();
            expect(firstRowValues.length).toEqual(18);
    
            const firstValue = firstRowValues[0].getString();
            expect(firstValue).toEqual("local");
        })
    })
})

const executeQueryPromisified = (client: StargateClient) => {
    return (message: Query, metadata: grpc.Metadata) => {
        return new Promise((resolve, reject) => {
            client.executeQuery(message, metadata, (error, value) => {
                if (error) reject (error);
                resolve(value);
            })            
        })
    }
}