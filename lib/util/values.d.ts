import { Value } from "../proto/query_pb";
/**
 * Converts a Value containing a Stargate UUID type to a
 * string containing the UUID.
 *
 * Throws an error if the conversion fails, either because the passed
 * Value does not contain a UUID or because the decimal-to-hexadecimal
 * conversion can't proceed as expected
 * @param value A Value type containing a Stargate UUID
 * @returns a string representation of the UUID, e.g. "00112233-4455-6677-8899-aabbccddeeff"
 */
export declare const toUUIDString: (value: Value) => string;
//# sourceMappingURL=values.d.ts.map
