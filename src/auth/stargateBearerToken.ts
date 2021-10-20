import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { StargateAuthMetadata } from "./StargateAuthMetadata";

export class StargateBearerToken extends StargateAuthMetadata {
  #token: string;

  constructor(token: string) {
    super();
    this.#token = token;
  }

  compose(callCredentials: CallCredentials): CallCredentials {
    const currentGenerators = this.metadataGenerators;
    const newGenerator = callCredentials.generateMetadata;
    const newToken = new StargateBearerToken(this.#token);
    newToken.metadataGenerators = currentGenerators.concat(newGenerator);
    return newToken;
  }

  _equals(other: CallCredentials): boolean {
    if (this === other) {
      return true;
    }
    if (other instanceof StargateBearerToken) {
      return this.#token === other.#token;
    }
    return false;
  }

  protected async getStargateAuthMetadata(): Promise<Metadata> {
    const metadata = new Metadata();
    metadata.set("x-cassandra-token", this.#token);

    return metadata;
  }
}
