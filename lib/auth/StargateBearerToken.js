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
var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it"
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
        ? (f.value = value)
        : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it"
      );
    return kind === "m"
      ? f
      : kind === "a"
      ? f.call(receiver)
      : f
      ? f.value
      : state.get(receiver);
  };
var _StargateBearerToken_token;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StargateBearerToken = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
class StargateBearerToken extends grpc_js_1.CallCredentials {
  constructor(token) {
    super();
    _StargateBearerToken_token.set(this, void 0);
    __classPrivateFieldSet(this, _StargateBearerToken_token, token, "f");
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
  compose(callCredentials) {
    const currentGenerators = this.metadataGenerators;
    const newGenerator = callCredentials.generateMetadata;
    const newToken = new StargateBearerToken(
      __classPrivateFieldGet(this, _StargateBearerToken_token, "f")
    );
    newToken.metadataGenerators = currentGenerators.concat(newGenerator);
    return newToken;
  }
  _equals(other) {
    if (this === other) {
      return true;
    }
    if (other instanceof StargateBearerToken) {
      return (
        __classPrivateFieldGet(this, _StargateBearerToken_token, "f") ===
        __classPrivateFieldGet(other, _StargateBearerToken_token, "f")
      );
    }
    return false;
  }
  getStargateAuthMetadata() {
    return __awaiter(this, void 0, void 0, function* () {
      const metadata = new grpc_js_1.Metadata();
      metadata.set(
        "x-cassandra-token",
        __classPrivateFieldGet(this, _StargateBearerToken_token, "f")
      );
      return metadata;
    });
  }
}
exports.StargateBearerToken = StargateBearerToken;
_StargateBearerToken_token = new WeakMap();
