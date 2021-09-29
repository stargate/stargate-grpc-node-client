import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";
interface TableBasedCallCredentialsConfig {
    username: string;
    password: string;
}
export declare class TableBasedCallCredentials extends CallCredentials {
    #private;
    private httpClient;
    private metadataGenerators;
    constructor({ username, password }: TableBasedCallCredentialsConfig);
    generateMetadata(options: CallMetadataOptions): Promise<Metadata>;
    compose(callCredentials: CallCredentials): CallCredentials;
    _equals(other: CallCredentials): boolean;
    private getMetadataFromStargate;
}
export {};
//# sourceMappingURL=auth.d.ts.map