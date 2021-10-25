"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCQLTime = exports.toUUIDString = void 0;
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
const toUUIDString = (value) => {
  const ERROR_MESSAGE_PREFIX = "Unable to convert Value to UUID string: ";
  if (!value.hasUuid())
    throw new Error(
      ERROR_MESSAGE_PREFIX.concat("the provided Value does not contain a UUID")
    );
  const uuid = value.getUuid(); // cast is safe; we just checked the the Uuid is there.
  const decimalValues = uuid.getValue_asU8();
  if (decimalValues.length !== 16)
    throw new Error(
      ERROR_MESSAGE_PREFIX.concat(
        "the decimal array of the UUID does not have the proper length (16)"
      )
    );
  let stringValue = "";
  for (let i = 0; i < decimalValues.length; i++) {
    if (i === 4 || i === 6 || i === 8 || i === 10) {
      stringValue += "-";
    }
    let hexadecimalValue = decimalValues[i].toString(16);
    if (hexadecimalValue.length === 1) {
      hexadecimalValue = "0".concat(hexadecimalValue);
    }
    stringValue += hexadecimalValue;
  }
  return stringValue;
};
exports.toUUIDString = toUUIDString;
/**
 * Converts a Value containing a CQL time type to a
 * number representing the nanoseconds since midnight.
 *
 * Throws an error if the passed Value does not contain a time.
 *
 * @param value A Value type containing a CQL time
 * @returns a number representation of the time, e.g. 36930123456789
 */
const toCQLTime = (value) => {
  const ERROR_MESSAGE_PREFIX = "Unable to convert Value to CQL time: ";
  if (!value.hasTime())
    throw new Error(
      ERROR_MESSAGE_PREFIX.concat(
        "the provided value does not contain a CQL time type"
      )
    );
  const hexadecimalValue = value.getTime();
  const nanosecondsSinceMidnight = parseInt(hexadecimalValue.toString(16), 16);
  return nanosecondsSinceMidnight;
};
exports.toCQLTime = toCQLTime;
