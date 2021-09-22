import axios, { AxiosInstance } from "axios";
import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";

export interface AuthClient {
    getAuthToken: () => Promise<string>;
}

interface AuthToken {
    value: string;
    exp: string;
}

interface TableBasedAuthClientConfig {
    serviceURL: string;
    username: string;
    password: string;
}

const AUTH_SERVICE_TIMEOUT = 5000;

export const createTableBasedAuthClient = (config: TableBasedAuthClientConfig): AuthClient => {
    const {serviceURL, username, password} = config;
    const httpClient = axios.create({timeout: AUTH_SERVICE_TIMEOUT});

    let token: AuthToken;
    
    return {
        getAuthToken: async () => {

            if (!token) {
                try {
                    const response = await httpClient.post(serviceURL, {
                        username,
                        password
                    });

                    token = {
                        value: response.data.authToken,
                        exp: 'TODO'
                    }
                } catch(e) {
                    throw e;
                }
            }

            // TODO: check if we need a fresh token

            return token.value;
        }
    }
}

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

    compose(callCredentials: CallCredentials): CallCredentials {
        return this;
    }

    _equals(other: CallCredentials): boolean {
        return true;
    }
}