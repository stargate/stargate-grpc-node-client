import { Uuid } from '../proto/query_pb';
/**
 * TODO: Implement this for real
 * It should take a Value and not require unwrapping to a UUID
 * https://stackoverflow.com/questions/66304547/javascript-typescript-convert-uuid-from-most-significant-bits-msb-least-signi
 */
export declare const toUUID: (uuid: Uuid) => string;
export declare const blobToString: (bytes: Uint8Array) => string;
export declare const toDate: (days: number) => Date;
//# sourceMappingURL=client.d.ts.map