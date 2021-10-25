import { Value } from "../proto/query_pb";
/**
 * Converts a Value containing a CQL UUID type to a
 * string containing the UUID.
 *
 * Throws an error if the conversion fails, either because the passed
 * Value does not contain a UUID or because the decimal-to-hexadecimal
 * conversion can't proceed as expected.
 * @param value A Value type containing a CQL UUID
 * @returns a string representation of the UUID, e.g. "00112233-4455-6677-8899-aabbccddeeff"
 */
export declare const toUUIDString: (value: Value) => string;
/**
 * Converts a Value containing a CQL time type to a
 * number representing the nanoseconds since midnight.
 *
 * Throws an error if the passed Value does not contain a time.
 *
 * @param value A Value type containing a CQL time
 * @returns a number representation of the time, e.g. 36930123456789
 */
export declare const toCQLTime: (value: Value) => number;
//# sourceMappingURL=values.d.ts.map
