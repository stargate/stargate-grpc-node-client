import {add} from "./foo";

describe("add", () => {
    it("adds two numbers", () => {
        expect(add(2,2)).toBe(4);
    })
})