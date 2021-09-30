"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = exports.blobToString = exports.toUUID = void 0;
/**
 * TODO: Implement this for real
 * It should take a Value and not require unwrapping to a UUID
 * https://stackoverflow.com/questions/66304547/javascript-typescript-convert-uuid-from-most-significant-bits-msb-least-signi
 */
const toUUID = (uuid) => {
    return "f066f76d-5e96-4b52-8d8a-0f51387df76b";
};
exports.toUUID = toUUID;
const blobToString = (bytes) => {
    return new TextDecoder().decode(bytes);
};
exports.blobToString = blobToString;
const toDate = (days) => {
    const daysSinceEpoch = days - Math.pow(2, 31);
    const date = new Date(1970, 0, 1);
    date.setDate(date.getDate() + daysSinceEpoch);
    return date;
};
exports.toDate = toDate;
/**
 * This doesn't account for scale; given the 1.1 example it returns 11
 * https://stackoverflow.com/questions/39346517/convert-uint8arrayn-into-integer-in-node-js
 */
function convert(Uint8Arr) {
    const length = Uint8Arr.length;
    const buffer = Buffer.from(Uint8Arr);
    const result = buffer.readUIntBE(0, length);
    return result;
}
const toUuidString = (lsb, msb) => {
    return `${digits(msb >> BigInt(32), BigInt(8))}-${digits(msb >> BigInt(16), BigInt(4))}-${digits(msb, BigInt(4))}-${digits(lsb >> BigInt(48), BigInt(4))}-${digits(lsb, BigInt(12))}`;
};
const digits = (val, ds) => {
    const hi = BigInt(1) << (ds * BigInt(4));
    return (hi | (val & (hi - BigInt(1)))).toString(16).substring(1);
};
