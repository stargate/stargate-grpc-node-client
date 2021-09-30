import { Response, ResultSet, Uuid } from "../proto/query_pb";
export declare const toResultSet: (response: Response) => ResultSet | undefined;
/**
 * TODO: Implement this for real
 * It should take a Value and not require unwrapping to a UUID
 * https://stackoverflow.com/questions/66304547/javascript-typescript-convert-uuid-from-most-significant-bits-msb-least-signi
 */
export declare const toUUID: (uuid: Uuid) => string;
export declare const blobToString: (bytes: Uint8Array) => string;
//# sourceMappingURL=util.d.ts.map