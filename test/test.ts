import Converter from "../lib/universal";
import { expect } from "chai";
//import "mocha";

let conv = new Converter();

describe("colToNumber", function() {
    it("should convert A to 1", function() {
        expect(Converter.colToNumber("A")).to.equal(1);
    });

    it("should convert B to 2", function() {
        expect(Converter.colToNumber("B")).to.equal(2);
    });

    it("should convert AA to 2", function() {
        expect(Converter.colToNumber("AA")).to.equal(27);
    });

    it("should convert ZZ to 693", function() {
        expect(Converter.colToNumber("ZQ")).to.equal(693);
    });
});
