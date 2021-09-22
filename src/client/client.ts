import { Response, ResultSet } from '../proto/query_pb';

export const toResultSet = (response: Response): ResultSet => {
    const resultSet = response.getResultSet();
    const data = resultSet?.getData();
    // TODO: will this ever throw? How do we know it's legit?
    const test = ResultSet.deserializeBinary(data?.getValue() as Uint8Array);
    return test;
}