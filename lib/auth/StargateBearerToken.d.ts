import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { StargateAuthMetadata } from "./StargateAuthMetadata";
export declare class StargateBearerToken extends StargateAuthMetadata {
  #private;
  constructor(token: string);
  compose(callCredentials: CallCredentials): CallCredentials;
  _equals(other: CallCredentials): boolean;
  protected getStargateAuthMetadata(): Promise<Metadata>;
}
//# sourceMappingURL=StargateBearerToken.d.ts.map
