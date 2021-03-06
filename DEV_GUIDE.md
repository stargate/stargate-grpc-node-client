# Developer Guide

## Getting started

Clone the repo, then install dependencies:

`npm i`

## Running tests

Running tests will require you have Docker installed on your machine; see [their documentation](https://docs.docker.com/get-docker/) for installation details based on your platform.

Then simply run tests:

`npm test`

These tests include an integration suite that uses [the Testcontainers library](https://github.com/testcontainers/testcontainers-node) to spin up a Docker container running Stargate to test gRPC connection, queries, etc.

## Generating gRPC code stubs

Should the Stargate protobuf files change and you need to generate new gRPC code, this project has an NPM script you can use:

`npm run gen`

## TypeScript compilation

This client is written in TypeScript but must compile JS for use in vanilla JavaScript environments. **If you change source code in this client, be sure to use the `npm run compile` command after your changes to reflect them in the `lib` folder packaged for NPM consumers.**

## Testing changes locally

You can use [the yalc library](https://github.com/wclr/yalc) to publish changes to this client locally so you can test them with a consuming application. Assuming you have yalc installed and you've already made your changes, do the following:

```
(In your local copy of this repo)
npm run compile
yalc publish @stargate-oss/stargate-grpc-node-client

(In your local consuming application)
yalc add @stargate-oss/stargate-grpc-node-client
```

You may need to `rm -rf node_modules` and do a fresh `npm i` in the consuming application for the changes to take effect.

Once you have this dependency established, you can update this client locally with new changes at any time by running `yalc push` from the `stargate-grpc-node-client` directory.

## Coding style

This project uses eslint and prettier to lint and format code. These standards are enforced automatically with a husky pre-commit hook and in the CI pipeline.