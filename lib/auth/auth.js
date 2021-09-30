"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _TableBasedCallCredentials_username, _TableBasedCallCredentials_password;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBasedCallCredentials = void 0;
const axios_1 = __importDefault(require("axios"));
const grpc_js_1 = require("@grpc/grpc-js");
const AUTH_SERVICE_TIMEOUT = 5000;
class TableBasedCallCredentials extends grpc_js_1.CallCredentials {
    constructor({ username, password }) {
        super();
        _TableBasedCallCredentials_username.set(this, void 0);
        _TableBasedCallCredentials_password.set(this, void 0);
        __classPrivateFieldSet(this, _TableBasedCallCredentials_username, username, "f");
        __classPrivateFieldSet(this, _TableBasedCallCredentials_password, password, "f");
        this.httpClient = axios_1.default.create({ timeout: AUTH_SERVICE_TIMEOUT });
        this.metadataGenerators = [this.getMetadataFromStargate.bind(this)];
    }
    generateMetadata(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const base = new grpc_js_1.Metadata();
            const generated = yield Promise.all(this.metadataGenerators.map((generator) => generator(options)));
            for (const gen of generated) {
                base.merge(gen);
            }
            return base;
        });
    }
    compose(callCredentials) {
        const currentGenerators = this.metadataGenerators;
        const newGenerator = callCredentials.generateMetadata;
        const newCredsConfig = {
            username: __classPrivateFieldGet(this, _TableBasedCallCredentials_username, "f"),
            password: __classPrivateFieldGet(this, _TableBasedCallCredentials_password, "f"),
        };
        const newCreds = new TableBasedCallCredentials(newCredsConfig);
        newCreds.metadataGenerators = currentGenerators.concat(newGenerator);
        return newCreds;
    }
    _equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof TableBasedCallCredentials) {
            return (__classPrivateFieldGet(this, _TableBasedCallCredentials_username, "f") === __classPrivateFieldGet(other, _TableBasedCallCredentials_username, "f") && __classPrivateFieldGet(this, _TableBasedCallCredentials_password, "f") === __classPrivateFieldGet(other, _TableBasedCallCredentials_password, "f"));
        }
        return false;
    }
    getMetadataFromStargate(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { service_url } = options;
            const postBody = { username: __classPrivateFieldGet(this, _TableBasedCallCredentials_username, "f"), password: __classPrivateFieldGet(this, _TableBasedCallCredentials_password, "f") };
            const authResponse = yield this.httpClient.post(service_url, postBody);
            const metadata = new grpc_js_1.Metadata();
            metadata.set("x-cassandra-token", authResponse.data.authToken);
            return metadata;
        });
    }
}
exports.TableBasedCallCredentials = TableBasedCallCredentials;
_TableBasedCallCredentials_username = new WeakMap(), _TableBasedCallCredentials_password = new WeakMap();
