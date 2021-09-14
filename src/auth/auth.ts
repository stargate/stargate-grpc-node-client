import axios from "axios";

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