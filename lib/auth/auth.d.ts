import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";
export declare class TableBasedCallCredentials extends CallCredentials {
    #private;
    private httpClient;
    private metadataGenerators;
    constructor(username: string, password: string);
    generateMetadata(options: CallMetadataOptions): Promise<Metadata>;
    compose(callCredentials: CallCredentials): CallCredentials;
    _equals(other: CallCredentials): boolean;
    private getMetadataFromStargate;
}
//# sourceMappingURL=auth.d.ts.map