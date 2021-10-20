import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";
import { StargateAuthMetadata } from "./StargateAuthMetadata";
interface TabledBasedTokenConfig {
  username: string;
  password: string;
}
export declare class StargateTableBasedToken extends StargateAuthMetadata {
  #private;
  private httpClient;
  constructor({ username, password }: TabledBasedTokenConfig);
  compose(callCredentials: CallCredentials): CallCredentials;
  _equals(other: CallCredentials): boolean;
  protected getStargateAuthMetadata(
    options: CallMetadataOptions
  ): Promise<Metadata>;
}
export {};
//# sourceMappingURL=StargateTableBasedToken.d.ts.map
