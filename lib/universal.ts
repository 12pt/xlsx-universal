import { IWorkSheet, IWorkBook } from "xlsx";

export interface IUniversalObject extends Array<any> {
    [index: number]: Array<any>;
}

export interface IUniversalObjectContainer {
    [sheet: string]: IUniversalObject;
}

/**
 * XLSX WorkBook -> "Universal Object"
 * Given an xlsx workbook object, this library will convert it to a simple js array.
 * TODO: explain how xlsx's json utility doesn't do what we want
 */
export class Converter {
    static readonly alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static keepEmptySheets = false;

    /**
     * Convert a workbook into a representative js object. Allows you KISS.
     * @param {any} worksheet the worksheet to convert.
     */
    public static convert(worksheet: IWorkBook): IUniversalObjectContainer {
        let sheets: IUniversalObjectContainer = {};

        for (let sheet of worksheet.SheetNames) {
            let converted = Converter.sheetToArray(worksheet.Sheets[sheet]);

            if (converted.length > 0 || Converter.keepEmptySheets) {
                sheets[sheet] = converted;
            }
        }

        return sheets;
    }

    /**
     * Converts e.g. A -> 26, AA -> 27, and so on.
     * @param {string} col the column identifier to convert to an index.
     */
    private static coltonumber(col: string) {
        let result = 0;

        for (let i = 0, j = col.length - 1; i < col.length; i++ , j--) {
            result += Math.pow(26, j) * (Converter.alphabet.indexOf(col[i]) + 1);
        }

        return result;
    }

    /**
     * Convert a single sheet into a JS array, where the rows and columns are sync'd with the spreadsheets'.
     */
    private static sheetToArray(xlsobj: IWorkSheet): IUniversalObject {
        let spreadsheet = new Array<any>();
        for (let key in xlsobj) {
            if (xlsobj.hasOwnProperty(key) && key.indexOf("!") < 0) {
                try {
                    let row: any = key.match(/\d+/g);
                    let col: any = key.match(/[a-zA-Z]+/g);
                    if (row && col) {
                        row = row[0];
                        col = col[0];

                        // need to convert column names to numbers (i.e. A to 1, AA to 27, etc)
                        let colnum: number = Converter.coltonumber(col);
                        let rownum: number = Number(row);

                        colnum -= 1;
                        rownum -= 1;

                        if (!spreadsheet[rownum]) {
                            spreadsheet[rownum] = [];
                        }
                        spreadsheet[rownum][colnum] = xlsobj[key]["v"];
                    }
                } catch (err) {
                    console.warn("Oops! " + err);
                }
            }
        }
        return spreadsheet;
    }
}
