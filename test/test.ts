import Converter from "../lib/universal";
import { expect } from "chai";
import xlsx = require('xlsx');
import path = require("path");

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

describe("convert", function() {
    it("should return two objects of equal values with two files containing the same data.", function() {
        let csv = xlsx.readFile(path.join(__dirname, "./test1.csv"));
        let excel = xlsx.readFile(path.join(__dirname, "./test1.xlsx"));

        expect(Converter.convert(csv)).to.deep.equal(Converter.convert(excel));
    });

    it("should return a sheet with a 2D array even if its only one row", function() {
        let justrow = xlsx.readFile(path.join(__dirname, "./test2.ots"));
        let expected = {
            Sheet1: [["a", "b", "c", "d"]]
        }
        expect(Converter.convert(justrow)).to.deep.equal(expected);
    });
});
