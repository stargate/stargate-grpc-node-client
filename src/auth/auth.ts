import axios from "axios";

interface AuthClient {
    getAuthToken: () => Promise<string>;
}

interface AuthToken {
    value: string;
    exp: string;
}

const AUTH_SERVICE_TIMEOUT = 5000;

export const createTableBasedAuthClient = (serviceURL: string, username: string, password: string): AuthClient => {
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