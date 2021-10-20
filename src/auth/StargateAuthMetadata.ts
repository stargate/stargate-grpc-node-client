import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";

export abstract class StargateAuthMetadata extends CallCredentials {
  protected metadataGenerators: ((
    options: CallMetadataOptions
  ) => Promise<Metadata>)[];

  constructor() {
    super();
    this.metadataGenerators = [this.getStargateAuthMetadata.bind(this)];
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

  abstract getStargateAuthMetadata(
    options: CallMetadataOptions
  ): Promise<Metadata>;
}
