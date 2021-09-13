import axios from "axios";

axios.create({timeout: 5000});

export const getToken = async (endpoint: string): Promise<string> => {
    try {
        const response = await axios.post(`${endpoint}/v1/auth`, {
            username: 'cassandra',
            password: 'cassandra'
        })
        return response.data.authToken;

    } catch (e) {
        throw e;
    }


}