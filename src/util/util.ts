import { Response, ResultSet, Uuid } from "../proto/query_pb";

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
};

/**
 * TODO: Implement this for real
 * It should take a Value and not require unwrapping to a UUID
 * https://stackoverflow.com/questions/66304547/javascript-typescript-convert-uuid-from-most-significant-bits-msb-least-signi
 */
export const toUUID = (uuid: Uuid): string => {
  return "f066f76d-5e96-4b52-8d8a-0f51387df76b";
};

export const blobToString = (bytes: Uint8Array): string => {
  return new TextDecoder().decode(bytes);
};

const toDate = (days: number): Date => {
  const daysSinceEpoch = days - Math.pow(2, 31);
  const date = new Date(1970, 0, 1);
  date.setDate(date.getDate() + daysSinceEpoch);
  return date;
};

/**
 * This doesn't account for scale; given the 1.1 example it returns 11
 * https://stackoverflow.com/questions/39346517/convert-uint8arrayn-into-integer-in-node-js
 */
function convert(Uint8Arr: Uint8Array): number {
  const length = Uint8Arr.length;

  const buffer = Buffer.from(Uint8Arr);
  const result = buffer.readUIntBE(0, length);

  return result;
}

const toUuidString = (lsb: bigint, msb: bigint): string => {
  return `${digits(msb >> BigInt(32), BigInt(8))}-${digits(
    msb >> BigInt(16),
    BigInt(4)
  )}-${digits(msb, BigInt(4))}-${digits(lsb >> BigInt(48), BigInt(4))}-${digits(
    lsb,
    BigInt(12)
  )}`;
};

const digits = (val: bigint, ds: bigint): string => {
  const hi = BigInt(1) << (ds * BigInt(4));
  return (hi | (val & (hi - BigInt(1)))).toString(16).substring(1);
};
