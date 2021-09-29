import { Response, ResultSet} from '../proto/query_pb';

export const toResultSet = (response: Response): ResultSet | undefined => {
    const resultSet = response.getResultSet();
    if (!resultSet) return undefined;

    const data = resultSet.getData();
    if (!data) return undefined;

    const value = data.getValue();
    if (!value) return undefined;
    try {
        return ResultSet.deserializeBinary(value as Uint8Array);
    } catch (e) {
        return undefined;
    }
}