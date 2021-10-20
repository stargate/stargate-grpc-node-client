import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";

export class StargateBearerToken extends CallCredentials {
  #token: string;
  private metadataGenerators: ((
    options: CallMetadataOptions
  ) => Promise<Metadata>)[];

  constructor(token: string) {
    super();
    this.#token = token;
    this.metadataGenerators = [this.getMetadata.bind(this)];
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

  private async getMetadata(): Promise<Metadata> {
    const metadata = new Metadata();
    metadata.set("x-cassandra-token", this.#token);

    return metadata;
  }
}
