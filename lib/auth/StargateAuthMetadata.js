"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.StargateAuthMetadata = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
class StargateAuthMetadata extends grpc_js_1.CallCredentials {
  constructor() {
    super();
    this.metadataGenerators = [this.getStargateAuthMetadata.bind(this)];
  }
  generateMetadata(options) {
    return __awaiter(this, void 0, void 0, function* () {
      const base = new grpc_js_1.Metadata();
      const generated = yield Promise.all(
        this.metadataGenerators.map((generator) => generator(options))
      );
      for (const gen of generated) {
        base.merge(gen);
      }
      return base;
    });
  }
}
exports.StargateAuthMetadata = StargateAuthMetadata;
