import axios, { AxiosInstance } from "axios";
import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";

interface AuthToken {
    value: string;
    exp: string;
}
const AUTH_SERVICE_TIMEOUT = 5000;

export class TableBasedCallCredentials extends CallCredentials {
    private username: string;
    private password: string;
    private httpClient: AxiosInstance;
    private authToken: AuthToken | null;
    private metadataGenerators: ((options: CallMetadataOptions) => Promise<Metadata>)[];

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
        this.httpClient = axios.create({timeout: AUTH_SERVICE_TIMEOUT});
        this.authToken = null;
        this.metadataGenerators = [this.getMetadataFromStargate.bind(this)]
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
        const newCreds = new TableBasedCallCredentials(this.username, this.password);
        newCreds.metadataGenerators = currentGenerators.concat(newGenerator);
        return newCreds;
    }

    // TODO
    _equals(other: CallCredentials): boolean {
        return true;
    }

    private async getMetadataFromStargate(options: CallMetadataOptions): Promise<Metadata> {
        const {service_url} = options;
        try {
            const postBody = {username: this.username, password: this.password}
            const authResponse = await this.httpClient.post(service_url, postBody);

            const metadata = new Metadata();
            metadata.set('x-cassandra-token', authResponse.data.authToken);
    
            return metadata;
        } catch (e) {
            throw e;
        }
    }
}