"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid =
  exports.TypeSpec =
  exports.Response =
  exports.QueryParameters =
  exports.Query =
  exports.Decimal =
  exports.Collection =
  exports.StargateClient =
  exports.promisifyStargateClient =
  exports.StargateTableBasedToken =
  exports.StargateBearerToken =
    void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "StargateBearerToken", {
  enumerable: true,
  get: function () {
    return auth_1.StargateBearerToken;
  },
});
Object.defineProperty(exports, "StargateTableBasedToken", {
  enumerable: true,
  get: function () {
    return auth_1.StargateTableBasedToken;
  },
});
var util_1 = require("./util");
Object.defineProperty(exports, "promisifyStargateClient", {
  enumerable: true,
  get: function () {
    return util_1.promisifyStargateClient;
  },
});
var stargate_grpc_pb_1 = require("./proto/stargate_grpc_pb");
Object.defineProperty(exports, "StargateClient", {
  enumerable: true,
  get: function () {
    return stargate_grpc_pb_1.StargateClient;
  },
});
var query_pb_1 = require("./proto/query_pb");
Object.defineProperty(exports, "Collection", {
  enumerable: true,
  get: function () {
    return query_pb_1.Collection;
  },
});
Object.defineProperty(exports, "Decimal", {
  enumerable: true,
  get: function () {
    return query_pb_1.Decimal;
  },
});
Object.defineProperty(exports, "Query", {
  enumerable: true,
  get: function () {
    return query_pb_1.Query;
  },
});
Object.defineProperty(exports, "QueryParameters", {
  enumerable: true,
  get: function () {
    return query_pb_1.QueryParameters;
  },
});
Object.defineProperty(exports, "Response", {
  enumerable: true,
  get: function () {
    return query_pb_1.Response;
  },
});
Object.defineProperty(exports, "TypeSpec", {
  enumerable: true,
  get: function () {
    return query_pb_1.TypeSpec;
  },
});
Object.defineProperty(exports, "Uuid", {
  enumerable: true,
  get: function () {
    return query_pb_1.Uuid;
  },
});
