import { PromisifiedStargateClient } from "../util/promise";
import { promisifyStargateClient, toCQLTime, toUUIDString } from "../util";
import { StargateTableBasedToken } from "../auth";
import { GenericContainer, StartedTestContainer, Wait } from "testcontainers";
import {
  Batch,
  BatchQuery,
  Collection,
  Inet,
  Query,
  QueryParameters,
  ResultSet,
  TypeSpec,
  Value,
  Values,
} from "../proto/query_pb";
import * as grpc from "@grpc/grpc-js";
import { StargateClient } from "../proto/stargate_grpc_pb";
import { Any } from "google-protobuf/google/protobuf/any_pb";

describe("Stargate gRPC client integration tests", () => {
  // Two minutes should be plenty to spin up the Stargate container
  jest.setTimeout(120000);
  let container: StartedTestContainer;
  let authEndpoint: string;
  let grpcEndpoint: string;

  beforeAll(async () => {
    container = await new GenericContainer("stargateio/stargate-3_11:v1.0.40")
      .withEnv("CLUSTER_NAME", "test")
      .withEnv("CLUSTER_VERSION", "3.11")
      .withEnv("DEVELOPER_MODE", "true")
      .withEnv("ENABLE_AUTH", "true")
      .withExposedPorts(8081, 8084, 8090)
      .withWaitStrategy(Wait.forLogMessage(/Finished starting bundles./i))
      .start();

    const containerHost = container.getHost();
    authEndpoint = `http://${containerHost}:${container.getMappedPort(
      8081
    )}/v1/auth`;
    grpcEndpoint = `${containerHost}:${container.getMappedPort(8090)}`;
  });

  afterAll(async () => {
    if (container) {
      await container.stop();
    }
  });

  describe("executeQuery", () => {
    it("supports basic queries", async () => {
      const tabledBasedToken = new StargateTableBasedToken({
        authEndpoint,
        username: "cassandra",
        password: "cassandra",
      });
      const metadata = await tabledBasedToken.generateMetadata({
        service_url: authEndpoint,
      });

      const stargateClient = new StargateClient(
        grpcEndpoint,
        grpc.credentials.createInsecure()
      );

      const promisifiedClient = promisifyStargateClient(stargateClient);

      const query = new Query();
      query.setCql("select * from system.local");

      const response = await promisifiedClient.executeQuery(query, metadata);

      const resultSet = response.getResultSet() as ResultSet;
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
      const tableBasedToken = new StargateTableBasedToken({
        authEndpoint,
        username: "cassandra",
        password: "cassandra",
      });
      const metadata = await tableBasedToken.generateMetadata({
        service_url: authEndpoint,
      });

      const stargateClient = new StargateClient(
        grpcEndpoint,
        grpc.credentials.createInsecure()
      );

      const promisifiedClient = promisifyStargateClient(stargateClient);

      const query = new Query();
      query.setCql(
        "select gc_grace_seconds, default_time_to_live, max_index_interval, memtable_flush_period_in_ms, min_index_interval, read_repair_chance, crc_check_chance, dclocal_read_repair_chance, bloom_filter_fp_chance from system_schema.tables"
      );

      const response = await promisifiedClient.executeQuery(query, metadata);

      const resultSet = response.getResultSet() as ResultSet;
      expect(resultSet.getColumnsList().length).toEqual(9);

      const firstColumnSpec = resultSet.getColumnsList()[0];

      const expectedTypeSpec = new TypeSpec();
      expectedTypeSpec.setBasic(9); // 9 = int
      expect(firstColumnSpec.getType()).toEqual(expectedTypeSpec);

      expect(firstColumnSpec.getName()).toEqual("gc_grace_seconds");

      const rowsReturned = resultSet.getRowsList();
      expect(rowsReturned.length).toBeGreaterThanOrEqual(37);

      expect(rowsReturned[0].getValuesList().length).toEqual(9);

      const firstRowFirstValue = rowsReturned[0].getValuesList()[0];
      const asInt = firstRowFirstValue.getInt();
      expect(asInt).toEqual(7776000);
      expect(resultSet.hasPagingState()).toBe(false);
    });
    it("Supports full CRUD operations", async () => {
      const tableBasedToken = new StargateTableBasedToken({
        authEndpoint,
        username: "cassandra",
        password: "cassandra",
      });
      const metadata = await tableBasedToken.generateMetadata({
        service_url: authEndpoint,
      });

      const stargateClient = new StargateClient(
        grpcEndpoint,
        grpc.credentials.createInsecure()
      );

      const promisifiedClient = promisifyStargateClient(stargateClient);

      const createKeyspaceQuery = new Query();
      createKeyspaceQuery.setCql(
        "CREATE KEYSPACE IF NOT EXISTS ks1 WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};"
      );

      const createKeyspaceResponse = await promisifiedClient.executeQuery(
        createKeyspaceQuery,
        metadata
      );

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
            );`;

      const createTableQuery = new Query();
      createTableQuery.setCql(createTableCQL);

      const createTableResponse = await promisifiedClient.executeQuery(
        createTableQuery,
        metadata
      );

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

      const insertResponse = await promisifiedClient.executeQuery(
        insertQuery,
        metadata
      );

      expect(insertResponse.hasResultSet()).toBe(false);

      const selectAllQuery = new Query();
      selectAllQuery.setCql("select * from ks1.tbl1");

      const selectAllResponse = await promisifiedClient.executeQuery(
        selectAllQuery,
        metadata
      );

      const resultSet = selectAllResponse.getResultSet() as ResultSet;

      const firstRow = resultSet.getRowsList()[0];

      const [
        id,
        asciivalue,
        bigintvalue,
        blobvalue,
        booleanvalue,
        datevalue,
        decimalvalue,
        doublevalue,
        floatvalue,
        inetvalue,
        intvalue,
        listvalue,
        mapvalue,
        setvalue,
        smallintvalue,
        textvalue,
        timestampvalue,
        timeUUIDvalue,
        timevalue,
        tinyint,
        tuple,
        string,
        varint,
      ] = firstRow.getValuesList();

      expect(id.hasUuid()).toBe(true);
      expect(toUUIDString(id)).toBe("f066f76d-5e96-4b52-8d8a-0f51387df76b");

      expect(asciivalue.hasString()).toBe(true);
      expect(asciivalue.getString()).toBe("alpha");

      expect(bigintvalue.hasInt()).toBe(true);
      expect(bigintvalue.getInt()).toBe(1);

      expect(blobvalue.hasBytes()).toBe(true);

      expect(booleanvalue.hasBoolean()).toBe(true);
      expect(booleanvalue.getBoolean()).toBe(true);

      expect(datevalue.hasDate()).toBe(true);

      const asDate = datevalue.getDate();
      expect(asDate).toEqual(2147502525);

      expect(decimalvalue.hasDecimal()).toBe(true);

      expect(doublevalue.hasDouble()).toBe(true);
      expect(doublevalue.getDouble()).toBe(2.2);

      expect(floatvalue.hasFloat()).toBe(true);
      /**
       * JS floating-point precision causes this issue; it's not something
       * our client can solve.
       * https://github.com/grpc/grpc/issues/2227
       */
      expect(floatvalue.getFloat()).toBe(3.299999952316284);

      expect(inetvalue.hasInet()).toBe(true);
      const inetBytes = (inetvalue.getInet() as Inet).getValue_asU8();

      expect(inetBytes.length).toBe(4);
      expect(inetBytes[0]).toBe(127);
      expect(inetBytes[1]).toBe(0);
      expect(inetBytes[2]).toBe(0);
      expect(inetBytes[3]).toBe(1);

      expect(intvalue.hasInt()).toBe(true);
      expect(intvalue.getInt()).toBe(2);

      expect(listvalue.hasCollection()).toBe(true);
      const elementsInList = (
        listvalue.getCollection() as Collection
      ).getElementsList();
      const [first, second, third] = elementsInList;
      expect(first.getString()).toBe("a");
      expect(second.getString()).toBe("b");
      expect(third.getString()).toBe("c");

      expect(mapvalue.hasCollection()).toBe(true);
      const mapCollection = mapvalue.getCollection() as Collection;
      const valuesInMapCollection = mapCollection.getElementsList();

      expect(valuesInMapCollection[0].getInt()).toBe(1);
      expect(valuesInMapCollection[1].getString()).toBe("a");
      expect(valuesInMapCollection[2].getInt()).toBe(2);
      expect(valuesInMapCollection[3].getString()).toBe("b");
      expect(valuesInMapCollection[4].getInt()).toBe(3);
      expect(valuesInMapCollection[5].getString()).toBe("c");

      expect(setvalue.hasCollection()).toBe(true);
      const elementsInSet = (
        setvalue.getCollection() as Collection
      ).getElementsList();
      const [firstSetItem, secondSetItem, thirdSetItem] = elementsInSet;
      expect(firstSetItem.getString()).toBe("a");
      expect(secondSetItem.getString()).toBe("b");
      expect(thirdSetItem.getString()).toBe("c");

      expect(smallintvalue.hasInt()).toBe(true);
      expect(smallintvalue.getInt()).toBe(3);

      expect(textvalue.hasString()).toBe(true);
      expect(textvalue.getString()).toBe("bravo");

      expect(timestampvalue.hasInt()).toBe(true);
      expect(timestampvalue.getInt()).toBe(1631032831123);

      expect(timeUUIDvalue.hasUuid()).toBe(true);
      expect(toUUIDString(timeUUIDvalue)).toBe(
        "30821634-13ad-11eb-adc1-0242ac120002"
      );

      expect(timevalue.hasTime()).toBe(true);
      expect(toCQLTime(timevalue)).toBe(36930123456789);

      expect(tinyint.hasInt()).toBe(true);
      expect(tinyint.getInt()).toBe(5);

      expect(tuple.hasCollection()).toBe(true);
      const elementsInTuple = (
        tuple.getCollection() as Collection
      ).getElementsList();
      const [firstTupleItem, secondTupleItem, thirdTupleItem] = elementsInTuple;
      expect(firstTupleItem.getInt()).toBe(3);
      expect(secondTupleItem.getString()).toBe("bar");
      /**
       * Again, JS floating-point precision issue.
       */
      expect(thirdTupleItem.getFloat()).toBe(2.0999999046325684);

      expect(string.hasString()).toBe(true);
      expect(string.getString()).toEqual("charlie");

      expect(varint.hasVarint()).toBe(true);

      const updateQuery = new Query();
      updateQuery.setCql(
        "update ks1.tbl1 set asciivalue = 'echo' where id = f066f76d-5e96-4b52-8d8a-0f51387df76b;"
      );

      const updateResponse = await promisifiedClient.executeQuery(
        updateQuery,
        metadata
      );

      expect(updateResponse.hasResultSet()).toBe(false);

      const selectAllWithIdQuery = new Query();
      selectAllWithIdQuery.setCql(
        "select * from ks1.tbl1 where id = f066f76d-5e96-4b52-8d8a-0f51387df76b;"
      );

      const selectAllWithIdResponse = await promisifiedClient.executeQuery(
        selectAllWithIdQuery,
        metadata
      );

      const selectAllWithIdResultSet =
        selectAllWithIdResponse.getResultSet() as ResultSet;

      const firstRowOfResult = selectAllWithIdResultSet.getRowsList()[0];

      const [_, newasciiValue] = firstRowOfResult.getValuesList();

      expect(newasciiValue.hasString()).toBe(true);
      expect(newasciiValue.getString()).toBe("echo");
    });
    it("Supports parameterized queries", async () => {
      const tableBasedToken = new StargateTableBasedToken({
        authEndpoint,
        username: "cassandra",
        password: "cassandra",
      });
      const metadata = await tableBasedToken.generateMetadata({
        service_url: authEndpoint,
      });

      const stargateClient = new StargateClient(
        grpcEndpoint,
        grpc.credentials.createInsecure()
      );

      const promisifiedClient = promisifyStargateClient(stargateClient);

      const query = new Query();
      query.setCql(
        "select * from system_schema.keyspaces where keyspace_name = ?"
      );

      const keyspaceNameValue = new Value();
      keyspaceNameValue.setString("system");

      const queryValues = new Values();
      queryValues.setValuesList([keyspaceNameValue]);

      query.setValues(queryValues);

      const queryParameters = new QueryParameters();
      queryParameters.setTracing(false);
      queryParameters.setSkipMetadata(false);

      query.setParameters(queryParameters);

      const response = await promisifiedClient.executeQuery(query, metadata);

      const resultSet = response.getResultSet() as ResultSet;

      const rows = resultSet.getRowsList();
      expect(rows.length).toBe(1);

      const firstRowFirstValue = rows[0].getValuesList()[0];
      expect(firstRowFirstValue.getString()).toBe("system");
    });
  });
  describe("executeBatch", () => {
    let tableBasedToken: StargateTableBasedToken;
    let metadata: grpc.Metadata;
    let promisifiedClient: PromisifiedStargateClient;

    const KEYSPACE = "batch_test";

    beforeAll(async () => {
      tableBasedToken = new StargateTableBasedToken({
        authEndpoint,
        username: "cassandra",
        password: "cassandra",
      });

      metadata = await tableBasedToken.generateMetadata({
        service_url: authEndpoint,
      });

      const stargateClient = new StargateClient(
        grpcEndpoint,
        grpc.credentials.createInsecure()
      );

      promisifiedClient = promisifyStargateClient(stargateClient);

      const createKeyspaceQuery = new Query();
      createKeyspaceQuery.setCql(
        `CREATE KEYSPACE ${KEYSPACE} WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 1}`
      );

      await promisifiedClient.executeQuery(createKeyspaceQuery, metadata);
    });

    it("supports sending multiple queries", async () => {
      const createTableQuery = new Query();
      createTableQuery.setCql(
        `CREATE TABLE ${KEYSPACE}.test (key text, value int, PRIMARY KEY(key, value))`
      );

      await promisifiedClient.executeQuery(createTableQuery, metadata);

      const insertOne = new BatchQuery();
      const insertTwo = new BatchQuery();

      insertOne.setCql(
        `INSERT INTO ${KEYSPACE}.test (key, value) VALUES('a', 1)`
      );
      insertTwo.setCql(
        `INSERT INTO ${KEYSPACE}.test (key, value) VALUES('b', 2)`
      );

      const batch = new Batch();
      batch.setQueriesList([insertOne, insertTwo]);

      await promisifiedClient.executeBatch(batch, metadata);

      const query = new Query();

      query.setCql(`SELECT * FROM ${KEYSPACE}.test`);

      const result = await promisifiedClient.executeQuery(query, metadata);
      expect(result.hasResultSet()).toBe(true);
    });
  });
});
