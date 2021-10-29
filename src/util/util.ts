import { Response, ResultSet } from "../proto/query_pb";

export const toResultSet = (response: Response): ResultSet | undefined => {
  return response.getResultSet();
};
