import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";
export declare class StargateBearerToken extends CallCredentials {
  #private;
  private metadataGenerators;
  constructor(token: string);
  generateMetadata(options: CallMetadataOptions): Promise<Metadata>;
  compose(callCredentials: CallCredentials): CallCredentials;
  _equals(other: CallCredentials): boolean;
  protected getStargateAuthMetadata(): Promise<Metadata>;
}
//# sourceMappingURL=StargateBearerToken.d.ts.map
