import { Uuid, Value } from "../proto/query_pb";

import { toUUIDString } from ".";
import { toCQLTime } from "./values";

describe("Value-mapping functions", () => {
  describe("toUUIDString", () => {
    describe("value passed has UUID", () => {
      describe("length of UInt8Array in UUID is 16", () => {
        it("properly converts the UInt8Array to a hecadecimal UUID", () => {
          const uuidOneAsString = "f066f76d-5e96-4b52-8d8a-0f51387df76b";
          const uuidOneAsDecimals = new Uint8Array([
            240, 102, 247, 109, 94, 150, 75, 82, 141, 138, 15, 81, 56, 125, 247,
            107,
          ]);

          const uuidOne = new Uuid();
          uuidOne.setValue(uuidOneAsDecimals);

          const valueOne = new Value();
          valueOne.setUuid(uuidOne);

          expect(toUUIDString(valueOne)).toBe(uuidOneAsString);

          const uuidTwoAsString = "00112233-4455-6677-8899-aabbccddeeff";
          const uuidTwoAsDecimals = new Uint8Array([
            0, 17, 34, 51, 68, 85, 102, 119, 136, 153, 170, 187, 204, 221, 238,
            255,
          ]);

          const uuidTwo = new Uuid();
          uuidTwo.setValue(uuidTwoAsDecimals);

          const valueTwo = new Value();
          valueTwo.setUuid(uuidTwo);

          expect(toUUIDString(valueTwo)).toBe(uuidTwoAsString);
        });
      });
    });
  });
  describe("toCQLTime", () => {
    describe("value passed has time", () => {
      it("properly converts the value to nanoseconds since midnight", () => {
        const tests = [{ input: 0x219676e3e115, output: 36930123456789 }];

        tests.forEach((testData) => {
          const { input, output } = testData;
          const value = new Value();
          value.setTime(input);

          expect(toCQLTime(value)).toBe(output);
        });
      });
    });
  });
});
