import { blobToString, toDate, toUUID } from "./client";
import { TableBasedCallCredentials } from "../auth/auth";
import { GenericContainer, StartedTestContainer } from "testcontainers";
import {
  Collection,
  Decimal,
  Payload,
  Query,
  QueryParameters,
  Response,
  ResultSet,
  TypeSpec,
  Uuid,
} from "../proto/query_pb";
import * as grpc from "@grpc/grpc-js";
import { StargateClient } from "../proto/stargate_grpc_pb";
import { Any } from "google-protobuf/google/protobuf/any_pb";
import { toResultSet } from "../util";

describe("Stargate gRPC client integration tests", () => {
  jest.setTimeout(40000);
  describe("sendQuery", () => {
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

    it("supports basic queries", async () => {
      const tableBasedCallCredentials = new TableBasedCallCredentials({
        username: "cassandra",
        password: "cassandra",
      });
      const metadata = await tableBasedCallCredentials.generateMetadata({
        service_url: authEndpoint,
      });

      const stargateClient = new StargateClient(
        grpcEndpoint,
        grpc.credentials.createInsecure()
      );

      const query = new Query();
      query.setCql("select * from system.local");

      const promisifiedQuery = executeQueryPromisified(stargateClient);

      const response = (await promisifiedQuery(query, metadata)) as Response;

      const resultSet = toResultSet(response) as ResultSet;
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
      const tableBasedCallCredentials = new TableBasedCallCredentials({
        username: "cassandra",
        password: "cassandra",
      });
      const metadata = await tableBasedCallCredentials.generateMetadata({
        service_url: authEndpoint,
      });

      const stargateClient = new StargateClient(
        grpcEndpoint,
        grpc.credentials.createInsecure()
      );

      const query = new Query();
      query.setCql(
        "select gc_grace_seconds, default_time_to_live, max_index_interval, memtable_flush_period_in_ms, min_index_interval, read_repair_chance, crc_check_chance, dclocal_read_repair_chance, bloom_filter_fp_chance from system_schema.tables"
      );

      const promisifiedQuery = executeQueryPromisified(stargateClient);

      const response = (await promisifiedQuery(query, metadata)) as Response;

      const resultSet = toResultSet(response) as ResultSet;
      expect(resultSet.getColumnsList().length).toEqual(9);

      // Check the first column returned
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
      const tableBasedCallCredentials = new TableBasedCallCredentials({
        username: "cassandra",
        password: "cassandra",
      });
      const metadata = await tableBasedCallCredentials.generateMetadata({
        service_url: authEndpoint,
      });

      const stargateClient = new StargateClient(
        grpcEndpoint,
        grpc.credentials.createInsecure()
      );

      const createKeyspaceQuery = new Query();
      createKeyspaceQuery.setCql(
        "CREATE KEYSPACE IF NOT EXISTS ks1 WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};"
      );

      const promisifiedQuery = executeQueryPromisified(stargateClient);

      const createKeyspaceResponse = (await promisifiedQuery(
        createKeyspaceQuery,
        metadata
      )) as Response;

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

      const createTableResponse = (await promisifiedQuery(
        createTableQuery,
        metadata
      )) as Response;

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

      const insertResponse = (await promisifiedQuery(
        insertQuery,
        metadata
      )) as Response;

      expect(insertResponse.hasResultSet()).toBe(false);

      const selectAllQuery = new Query();
      selectAllQuery.setCql("select * from ks1.tbl1");

      const selectAllResponse = (await promisifiedQuery(
        selectAllQuery,
        metadata
      )) as Response;
      const resultSet = toResultSet(selectAllResponse) as ResultSet;

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
      expect(toUUID(id.getUuid() as Uuid)).toEqual(
        "f066f76d-5e96-4b52-8d8a-0f51387df76b"
      );

      expect(asciivalue.hasString()).toBe(true);
      expect(asciivalue.getString()).toBe("alpha");

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
       * (I'm worried about timezones)
       */
      const asDate = datevalue.getDate();
      expect(asDate).toEqual(2147502525);

      expect(decimalvalue.hasDecimal()).toBe(true);
      // TODO: How to map decimals here?

      expect(doublevalue.hasDouble()).toBe(true);
      expect(doublevalue.getDouble()).toBe(2.2);

      expect(floatvalue.hasFloat()).toBe(true);
      /**
       * TODO: We inserted 3.3 but JS floating-point precision is wacky.
       * It looks like this is an issue with JS/the grpc library; not sure
       * we can solve it.
       * https://github.com/grpc/grpc/issues/2227
       */
      expect(floatvalue.getFloat()).toBe(3.299999952316284);

      expect(inetvalue.hasBytes()).toBe(true);
      const inetBytes = inetvalue.getBytes();
      /**
       * TODO: surely there's a better way to do this,
       * but the blobToString helper gives us an empty string...
       */
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

      /**
       * TODO: Is there any way to do this generically, so we could just
       * create a map for them?
       */
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
      // TODO: received is 3495380673717146000,12520290924444647000, think we need UUID conversion here
      //            expect((timeUUIDvalue.getUuid() as Uuid).toString()).toBe("30821634-13ad-11eb-adc1-0242ac120002")

      expect(timevalue.hasTime()).toBe(true);
      expect(timevalue.getTime()).toBe(0x219676e3e115);

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
       * TODO: Again, JS floating-point numbers. Not sure it's safe
       * to send any floating-point numbers via Node...
       */
      expect(thirdTupleItem.getFloat()).toBe(2.0999999046325684);

      expect(string.hasString()).toBe(true);
      expect(string.getString()).toEqual("charlie");

      expect(varint.hasVarint()).toBe(true);
      // TODO: need to convert this to a number...

      const updateQuery = new Query();
      updateQuery.setCql(
        "update ks1.tbl1 set asciivalue = 'echo' where id = f066f76d-5e96-4b52-8d8a-0f51387df76b;"
      );

      const updateResponse = (await promisifiedQuery(
        updateQuery,
        metadata
      )) as Response;
      expect(updateResponse.hasResultSet()).toBe(false);

      const selectAllWithIdQuery = new Query();
      selectAllWithIdQuery.setCql(
        "select * from ks1.tbl1 where id = f066f76d-5e96-4b52-8d8a-0f51387df76b;"
      );

      const selectAllWithIdResponse = (await promisifiedQuery(
        selectAllWithIdQuery,
        metadata
      )) as Response;
      const selectAllWithIdResultSet = toResultSet(
        selectAllWithIdResponse
      ) as ResultSet;

      const firstRowOfResult = selectAllWithIdResultSet.getRowsList()[0];

      const [_, newasciiValue] = firstRowOfResult.getValuesList();

      expect(newasciiValue.hasString()).toBe(true);
      expect(newasciiValue.getString()).toBe("echo");
    });
    it.skip("Supports paramaterized queries", async () => {
      const tableBasedCallCredentials = new TableBasedCallCredentials({
        username: "cassandra",
        password: "cassandra",
      });
      const metadata = await tableBasedCallCredentials.generateMetadata({
        service_url: authEndpoint,
      });

      const stargateClient = new StargateClient(
        grpcEndpoint,
        grpc.credentials.createInsecure()
      );

      const query = new Query();
      query.setCql(
        "select * from system_schema.keyspaces where keyspace_name = ?"
      );

      const payload = new Payload();
      payload.setType(0);
      const any = new Any();
      any.setValue("system");
      payload.setData(any);

      const queryParameters = new QueryParameters();
      queryParameters.setTracing(false);
      queryParameters.setSkipMetadata(false);

      query.setValues(payload);
      query.setParameters(queryParameters);

      const promisifiedQuery = executeQueryPromisified(stargateClient);

      const response = (await promisifiedQuery(query, metadata)) as Response;

      const resultSet = toResultSet(response) as ResultSet;

      const rows = resultSet.getRowsList();
      expect(rows.length).toBe(1);

      const firstRowFirstValue = rows[0].getValuesList()[0];
      expect(firstRowFirstValue.getString()).toBe("system");

      // Or...

      stargateClient.executeQuery(query, metadata, (err, response) => {
        const resultSet = toResultSet(response as Response) as ResultSet;

        const rows = resultSet.getRowsList();
        expect(rows.length).toBe(1);

        const firstRowFirstValue = rows[0].getValuesList()[0];
        expect(firstRowFirstValue.getString()).toBe("system");
      });
    });
  });
});

const executeQueryPromisified = (client: StargateClient) => {
  return (message: Query, metadata: grpc.Metadata) => {
    return new Promise((resolve, reject) => {
      client.executeQuery(
        message,
        metadata,
        (error: grpc.ServiceError | null, value?: Response) => {
          if (error) reject(error);
          resolve(value);
        }
      );
    });
  };
};
