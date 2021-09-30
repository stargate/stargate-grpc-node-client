import { Any } from "google-protobuf/google/protobuf/any_pb";
import { Payload, Response, ResultSet } from "../proto/query_pb";
import { toResultSet } from "./index";

describe("utils", () => {
  describe("toResultSet", () => {
    describe("response contains no payload", () => {
      it("returns undefined", () => {
        const response = new Response();

        const result = toResultSet(response);
        expect(result).toBeUndefined();
      });
    });
    describe("result set contains no data", () => {
      it("returns undefined", () => {
        const response = new Response();
        const resultSet = new Payload();

        response.setResultSet(resultSet);

        const result = toResultSet(response);
        expect(result).toBeUndefined();
      });
    });
    describe("data in result set is missing a value", () => {
      it("returns undefined", () => {
        const response = new Response();
        const resultSet = new Payload();
        const data = new Any();

        resultSet.setData(data);
        response.setResultSet(resultSet);

        const result = toResultSet(response);
        expect(result).toBeUndefined();
      });
    });
    describe("value is a non-empty value, but deserialization fails", () => {
      it("returns undefined", () => {
        const response = new Response();
        const resultSet = new Payload();
        const data = new Any();

        const value = new Uint8Array([21, 31]);

        data.setValue(value);

        resultSet.setData(data);
        response.setResultSet(resultSet);

        const result = toResultSet(response);
        expect(result).toBeUndefined();
      });
    });
    describe("value is a non-empty value, and serialization succeeds", () => {
      it("returns the value wrapped in a ResultSet", () => {
        const response = new Response();
        const resultSet = new Payload();
        const data = new Any();

        const actualResultSet = new ResultSet();

        data.setValue(actualResultSet.serializeBinary());

        resultSet.setData(data);
        response.setResultSet(resultSet);

        const result = toResultSet(response) as ResultSet;
        expect(result.getRowsList()).toEqual(actualResultSet.getRowsList());
        expect(result.getColumnsList()).toEqual(
          actualResultSet.getColumnsList()
        );
        expect(result.toString()).toEqual(actualResultSet.toString());
      });
    });
  });
});
