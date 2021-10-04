"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toResultSet = void 0;
const query_pb_1 = require("../proto/query_pb");
const toResultSet = (response) => {
  const resultSet = response.getResultSet();
  if (!resultSet) return undefined;
  const data = resultSet.getData();
  if (!data) return undefined;
  const value = data.getValue();
  if (!value) return undefined;
  try {
    return query_pb_1.ResultSet.deserializeBinary(value);
  } catch (e) {
    return undefined;
  }
};
exports.toResultSet = toResultSet;
