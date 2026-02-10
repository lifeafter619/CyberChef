/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import { scanForFileTypes } from "../lib/FileType.mjs";
import { FILE_SIGNATURES } from "../lib/FileSignatures.mjs";

/**
 * Scan for Embedded Files operation
 */
class ScanForEmbeddedFiles extends Operation {

    /**
     * ScanForEmbeddedFiles constructor
     */
    constructor() {
        super();

        this.name = "Scan for Embedded Files";
        this.module = "Default";
        this.description = "通过在所有偏移处搜索魔数来扫描数据中可能的嵌入文件。此操作容易产生误报。<br><br>警告：大于约 100KB 的文件处理时间会非常长。";
        this.infoURL = "https://wikipedia.org/wiki/List_of_file_signatures";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = Object.keys(FILE_SIGNATURES).map(cat => {
            return {
                name: cat,
                type: "boolean",
                value: cat === "Miscellaneous" ? false : true
            };
        });
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        let output = "正在扫描数据中的“魔术字节”，以检测可能的嵌入文件。以下结果可能包含误报，请勿将其视为可靠结论。任何足够长的文件都可能偶然包含这些魔术字节。\n",
            numFound = 0;
        const categories = [],
            data = new Uint8Array(input);

        args.forEach((cat, i) => {
            if (cat) categories.push(Object.keys(FILE_SIGNATURES)[i]);
        });

        const types = scanForFileTypes(data, categories);

        if (types.length) {
            types.forEach(type => {
                numFound++;
                output += `\nOffset ${type.offset} (0x${Utils.hex(type.offset)}):
  File type:   ${type.fileDetails.name}
  Extension:   ${type.fileDetails.extension}
  MIME type:   ${type.fileDetails.mime}\n`;

                if (type?.fileDetails?.description?.length) {
                    output += `  Description: ${type.fileDetails.description}\n`;
                }
            });
        }

        if (numFound === 0) {
            output += "\n未发现嵌入文件。";
        }

        return output;
    }

}

export default ScanForEmbeddedFiles;
