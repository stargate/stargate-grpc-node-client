import axios, { AxiosInstance } from "axios";
import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";

interface TabledBasedTokenConfig {
  authEndpoint: string;
  username: string;
  password: string;
}

const AUTH_SERVICE_TIMEOUT = 5000;

export class StargateTableBasedToken extends CallCredentials {
  #authEndpoint: string;
  #username: string;
  #password: string;
  private metadataGenerators: ((
    options: CallMetadataOptions
  ) => Promise<Metadata>)[];
  private httpClient: AxiosInstance;

  constructor({ authEndpoint, username, password }: TabledBasedTokenConfig) {
    super();
    this.#authEndpoint = authEndpoint;
    this.#username = username;
    this.#password = password;
    this.metadataGenerators = [this.getStargateAuthMetadata.bind(this)];
    this.httpClient = axios.create({ timeout: AUTH_SERVICE_TIMEOUT });
  }

  async generateMetadata(options: CallMetadataOptions): Promise<Metadata> {
    const base = new Metadata();
    const generated: Metadata[] = await Promise.all(
      this.metadataGenerators.map((generator) => generator(options))
    );
    for (const gen of generated) {
      base.merge(gen);
    }
    return base;
  }

  compose(callCredentials: CallCredentials): CallCredentials {
    const currentGenerators = this.metadataGenerators;
    const newGenerator = callCredentials.generateMetadata;
    const newCredsConfig = {
      authEndpoint: this.#authEndpoint,
      username: this.#username,
      password: this.#password,
    };
    const newCreds = new StargateTableBasedToken(newCredsConfig);
    newCreds.metadataGenerators = currentGenerators.concat(newGenerator);
    return newCreds;
  }

  _equals(other: CallCredentials): boolean {
    if (this === other) {
      return true;
    }
    if (other instanceof StargateTableBasedToken) {
      return (
        this.#username === other.#username && this.#password === other.#password
      );
    }
    return false;
  }

  protected async getStargateAuthMetadata(
    options: CallMetadataOptions
  ): Promise<Metadata> {
    const { service_url } = options;
    const postBody = { username: this.#username, password: this.#password };
    const authResponse = await this.httpClient.post(service_url, postBody);

    const metadata = new Metadata();
    metadata.set("x-cassandra-token", authResponse.data.authToken);

    return metadata;
  }
}
