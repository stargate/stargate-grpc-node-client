"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisifyStargateClient = void 0;
const promisifyStargateClient = (client) => {
  return {
    executeQuery(argument, metadata, options) {
      return new Promise((resolve, reject) => {
        const callback = (error, value) => {
          if (error) reject(error);
          if (value) resolve(value);
        };
        if (!metadata && !options) {
          client.executeQuery(argument, callback);
        }
        if (metadata && options) {
          client.executeQuery(argument, metadata, options, callback);
        }
        if (metadata && !options) {
          client.executeQuery(argument, metadata, callback);
        }
        if (!metadata && options) {
          client.executeQuery(argument, options, callback);
        }
      });
    },
    executeBatch(argument, metadata, options) {
      return new Promise((resolve, reject) => {
        const callback = (error, value) => {
          if (error) reject(error);
          if (value) resolve(value);
        };
        if (!metadata && !options) {
          client.executeBatch(argument, callback);
        }
        if (metadata && options) {
          client.executeBatch(argument, metadata, options, callback);
        }
        if (metadata && !options) {
          client.executeBatch(argument, metadata, callback);
        }
        if (!metadata && options) {
          client.executeBatch(argument, options, callback);
        }
      });
    },
  };
};
exports.promisifyStargateClient = promisifyStargateClient;
