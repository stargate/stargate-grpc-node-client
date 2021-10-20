import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";
export declare abstract class StargateAuthMetadata extends CallCredentials {
  protected metadataGenerators: ((
    options: CallMetadataOptions
  ) => Promise<Metadata>)[];
  constructor();
  generateMetadata(options: CallMetadataOptions): Promise<Metadata>;
  protected abstract getStargateAuthMetadata(
    options: CallMetadataOptions
  ): Promise<Metadata>;
}
//# sourceMappingURL=StargateAuthMetadata.d.ts.map
