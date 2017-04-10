(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.XLSXUniversal = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * XLSX WorkBook -> "Universal Object"
 * Given an xlsx workbook object, this library will convert it to a simple js array.
 * TODO: explain how xlsx's json utility doesn't do what we want
 */
var Converter = (function () {
    function Converter() {
    }
    /**
     * Convert a workbook into a representative js object. Allows you KISS.
     * @param {any} worksheet the worksheet to convert.
     */
    Converter.convert = function (worksheet) {
        var sheets = [];
        for (var _i = 0, _a = worksheet.SheetNames; _i < _a.length; _i++) {
            var sheet = _a[_i];
            sheets.push(worksheet.Sheets[sheet]);
        }
        // get rid of empty sheets
        return sheets.map(Converter.sheetToArray).filter(function (arr) {
            return arr.length > 0;
        });
    };
    /**
     * Converts e.g. A -> 26, AA -> 27, and so on.
     * @param {string} col the column identifier to convert to an index.
     */
    Converter.coltonumber = function (col) {
        var result = 0;
        for (var i = 0, j = col.length - 1; i < col.length; i++, j--) {
            result += Math.pow(26, j) * (Converter.alphabet.indexOf(col[i]) + 1);
        }
        return result;
    };
    /**
     * Convert a single sheet into a JS array, where the rows and columns are sync'd with the spreadsheets'.
     */
    Converter.sheetToArray = function (xlsobj) {
        var spreadsheet = new Array();
        for (var key in xlsobj) {
            if (xlsobj.hasOwnProperty(key) && key.indexOf("!") < 0) {
                try {
                    var row = key.match(/\d+/g);
                    var col = key.match(/[a-zA-Z]+/g);
                    if (row && col) {
                        row = row[0];
                        col = col[0];
                        // need to convert column names to numbers (i.e. A to 1, AA to 27, etc)
                        var colnum = Converter.coltonumber(col);
                        var rownum = Number(row);
                        colnum -= 1;
                        rownum -= 1;
                        if (!spreadsheet[rownum]) {
                            spreadsheet[rownum] = [];
                        }
                        spreadsheet[rownum][colnum] = xlsobj[key]["v"];
                    }
                }
                catch (err) {
                    console.warn("Oops! " + err);
                }
            }
        }
        return spreadsheet;
    };
    return Converter;
}());
Converter.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
exports.Converter = Converter;

},{}]},{},[1])(1)
});