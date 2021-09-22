import {blobToString, toDate, toResultSet, toUUID} from "./client";
import {TableBasedCallCredentials} from "../auth/auth";
import {GenericContainer, StartedTestContainer} from "testcontainers";
import { Query, Response, TypeSpec, Uuid} from '../proto/query_pb';
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

        });
        it("all numeric", async () => {
            const tableBasedCallCredentials = new TableBasedCallCredentials('cassandra', 'cassandra');
            const metadata = await tableBasedCallCredentials.generateMetadata({service_url: authEndpoint});

            const stargateClient = new StargateClient(grpcEndpoint, grpc.credentials.createInsecure());

            const query = new Query();
            query.setCql("select gc_grace_seconds, default_time_to_live, max_index_interval, memtable_flush_period_in_ms, min_index_interval, read_repair_chance, crc_check_chance, dclocal_read_repair_chance, bloom_filter_fp_chance from system_schema.tables");

            const promisifiedQuery = executeQueryPromisified(stargateClient);

            const response = await promisifiedQuery(query, metadata) as Response;

            const resultSet = toResultSet(response);
            expect(resultSet.getColumnsList().length).toEqual(9);

            // Check the first column returned
            const firstColumnSpec = resultSet.getColumnsList()[0];
            const expectedTypeSpec = new TypeSpec();
            expectedTypeSpec.setBasic(9);
            expect(firstColumnSpec.getType()).toEqual(expectedTypeSpec);
            expect(firstColumnSpec.getName()).toEqual("gc_grace_seconds");

            const rowsReturned = resultSet.getRowsList();
            expect(rowsReturned.length).toBeGreaterThanOrEqual(37);

            expect(rowsReturned[0].getValuesList().length).toEqual(9);

            const firstRowFirstValue = rowsReturned[0].getValuesList()[0];
            const asInt = firstRowFirstValue.getInt();
            expect(asInt).toEqual(7776000);
            expect(resultSet.hasPagingState()).toBe(false);
        })
        it.only("Full CRUD", async () => {
            const tableBasedCallCredentials = new TableBasedCallCredentials('cassandra', 'cassandra');
            const metadata = await tableBasedCallCredentials.generateMetadata({service_url: authEndpoint});

            const stargateClient = new StargateClient(grpcEndpoint, grpc.credentials.createInsecure());

            const createKeyspaceQuery = new Query();
            createKeyspaceQuery.setCql("CREATE KEYSPACE IF NOT EXISTS ks1 WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};");

            const promisifiedQuery = executeQueryPromisified(stargateClient);

            const createKeyspaceResponse = await promisifiedQuery(createKeyspaceQuery, metadata) as Response;

            expect(createKeyspaceResponse.hasResultSet()).toBe(false);

            const createTableCQL = `
            CREATE TABLE IF NOT EXISTS ks1.tbl1 (
              id uuid PRIMARY KEY,
              asciivalue ascii,
              textvalue text,
              varcharvalue varchar,
              blobvalue blob,
              booleanvalue boolean,
              decimalvalue decimal,
              doublevalue double,
                floatvalue float,
              inetvalue inet,
              bigintvalue bigint,
              intvalue int,
              smallintvalue smallint,
              varintvalue varint,
              tinyintvalue tinyint,
              timevalue time,
              timestampvalue timestamp,
              datevalue date,
              timeuuidvalue timeuuid,
              mapvalue map<int,text>,
              listvalue list<text>,
              setvalue set<text>,
              tuplevalue tuple<int, text, float>
            );`

            const createTableQuery = new Query();
            createTableQuery.setCql(createTableCQL);

            const createTableResponse = await promisifiedQuery(createTableQuery, metadata) as Response;
            
            expect(createTableResponse.hasResultSet()).toBe(false);

            const insertCQL = `
            insert into ks1.tbl1 (
                id, 
                asciivalue,
                textvalue,
                varcharvalue,
                blobvalue,
                booleanvalue,
                decimalvalue,
                doublevalue,
                floatvalue,
                inetvalue,
                bigintvalue,
                intvalue,
                smallintvalue,
                varintvalue,
                tinyintvalue,
                timevalue,
                timestampvalue,
                datevalue,
                timeuuidvalue,
                mapvalue,
                listvalue,
                setvalue,
                tuplevalue
            ) values (
                f066f76d-5e96-4b52-8d8a-0f51387df76b,
                'alpha', 
                'bravo',
                'charlie',
                textAsBlob('foo'),
                true,
                1.1,
                2.2,
                3.3,
                '127.0.0.1',
                1,
                2,
                3,
                4,
                5,
                '10:15:30.123456789',
                '2021-09-07T16:40:31.123Z',
                '2021-09-07',
                30821634-13ad-11eb-adc1-0242ac120002,
                {1: 'a', 2: 'b', 3: 'c'},
                ['a', 'b', 'c'],
                {'a', 'b', 'c'},
                (3, 'bar', 2.1)
            );
            `;

            const insertQuery = new Query();
            insertQuery.setCql(insertCQL);

            const insertResponse = await promisifiedQuery(insertQuery, metadata) as Response;

            expect(insertResponse.hasResultSet()).toBe(false);

            const selectAllQuery = new Query();
            selectAllQuery.setCql("select * from ks1.tbl1");

            const selectAllResponse = await promisifiedQuery(selectAllQuery, metadata) as Response;
            const resultSet = toResultSet(selectAllResponse);

            const firstRow = resultSet.getRowsList()[0];

            const [id, asciivalue, bigintvalue, blobvalue, booleanvalue, datevalue, ...rest] = firstRow.getValuesList();

            expect(id.hasUuid()).toBe(true);
            expect(toUUID(id.getUuid() as Uuid)).toEqual("f066f76d-5e96-4b52-8d8a-0f51387df76b");

            expect(asciivalue.hasString()).toBe(true);
            expect(asciivalue.getString()).toBe("alpha")

            expect(bigintvalue.hasInt()).toBe(true);
            expect(bigintvalue.getInt()).toBe(1);

            expect(blobvalue.hasBytes()).toBe(true);
            const blobAsString = blobToString(blobvalue.getBytes_asU8());
            expect(blobAsString).toEqual("foo");

            expect(booleanvalue.hasBoolean()).toBe(true);
            expect(booleanvalue.getBoolean()).toBe(true);

            expect(datevalue.hasDate()).toBe(true);
        
            /**
             * TODO: This number is the # of days since epoch time,
             * with epoch starting at 2 ^31.
             * Should we expose a method to turn that into a Date object?
             */
            const asDate = datevalue.getDate();
            expect(asDate).toEqual(2147502525);
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