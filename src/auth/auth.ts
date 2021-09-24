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

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
        this.httpClient = axios.create({timeout: AUTH_SERVICE_TIMEOUT});
        this.authToken = null;
    }

    async generateMetadata(options: CallMetadataOptions): Promise<Metadata> {
        const {service_url} = options;
        if (!this.authToken) { // or auth token is expired
            try {
                const postBody = {username: this.username, password: this.password}
                const authResponse = await this.httpClient.post(service_url, postBody);

                this.authToken = {
                    value: authResponse.data.authToken,
                    exp: 'TODO'
                }
            } catch (e) {
                throw e;
            }
        }

        const metadata = new Metadata();
        metadata.set('x-cassandra-token', this.authToken.value);

        return metadata;
    }

    // TODO
    compose(callCredentials: CallCredentials): CallCredentials {
        return this;
    }

    // TODO
    _equals(other: CallCredentials): boolean {
        return true;
    }
}