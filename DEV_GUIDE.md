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

## Coding style

This project uses eslint and prettier to lint and format code. These standards are enforced automatically with a husky pre-commit hook and in the CI pipeline.