import { Response, ResultSet, Uuid } from '../proto/query_pb';

export const toResultSet = (response: Response): ResultSet => {
    const resultSet = response.getResultSet();
    const data = resultSet?.getData();
    // TODO: will this ever throw? How do we know it's legit?
    const test = ResultSet.deserializeBinary(data?.getValue() as Uint8Array);
    return test;
}

/**
 * TODO: Implement this for real
 * It should take a Value and not require unwrapping to a UUID
 * https://stackoverflow.com/questions/66304547/javascript-typescript-convert-uuid-from-most-significant-bits-msb-least-signi
 */
 export const toUUID = (uuid: Uuid): string => {
    return "f066f76d-5e96-4b52-8d8a-0f51387df76b";
}

export const blobToString = (bytes: Uint8Array): string => {
    return new TextDecoder().decode(bytes);
}

export const toDate = (days: number): Date => {
    const daysSinceEpoch = days - Math.pow(2, 31);
    const date = new Date(1970, 0, 1)
    date.setDate(date.getDate() + daysSinceEpoch);
    return date;;
}

const toUuidString = (lsb: bigint, msb: bigint): string => {
    return `${digits(msb >> BigInt(32), BigInt(8))}-${digits(msb >> BigInt(16), BigInt(4))}-${digits(
      msb,
      BigInt(4)
    )}-${digits(lsb >> BigInt(48), BigInt(4))}-${digits(lsb, BigInt(12))}`;
}
  
const digits = (val: bigint, ds: bigint): string => {
    const hi = BigInt(1) << (ds * BigInt(4));
    return (hi | (val & (hi - BigInt(1)))).toString(16).substring(1);
}