/**
 * Emulation of the SIGABA machine.
 *
 * @author hettysymes
 * @copyright hettysymes 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {LETTERS} from "../lib/Enigma.mjs";
import {NUMBERS, CR_ROTORS, I_ROTORS, SigabaMachine, CRRotor, IRotor} from "../lib/SIGABA.mjs";

/**
 * Sigaba operation
 */
class Sigaba extends Operation {

    /**
     * Sigaba constructor
     */
    constructor() {
        super();

        this.name = "SIGABA";
        this.module = "Bletchley";
        this.description = "使用二战时期的 SIGABA 机器进行加解密。<br><br>SIGABA（亦称 ECM Mark II）在二战期间至 1950 年代由美国用于信息加密。该机器由美军与海军在 1930 年代开发，至今未被攻破。它由 15 个转子组成：5 个密码转子以及 10 个用于控制密码转子步进的转子（5 个控制转子与 5 个索引转子）。与同时代的其他转子机（如 Enigma）相比，SIGABA 的步进机制更为复杂。所有示例转子接线为随机示例集。<br><br>要配置转子接线：对于密码转子与控制转子，输入从 A 到 Z 的字母映射字符串；对于索引转子，输入从 0 到 9 的数字序列。请注意，加密与解密并不相同，请先选择所需模式。<br><br>注：该实现已与其他软件仿真器对比测试，但尚未与硬件比对。";
        this.infoURL = "https://wikipedia.org/wiki/SIGABA";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "1st (left-hand) cipher rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "1st cipher rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "1st cipher rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "2nd cipher rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "2nd cipher rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "2nd cipher rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "3rd (middle) cipher rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "3rd cipher rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "3rd cipher rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "4th cipher rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "4th cipher rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "4th cipher rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "5th (right-hand) cipher rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "5th cipher rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "5th cipher rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "1st (left-hand) control rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "1st control rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "1st control rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "2nd control rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "2nd control rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "2nd control rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "3rd (middle) control rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "3rd control rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "3rd control rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "4th control rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "4th control rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "4th control rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "5th (right-hand) control rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "5th control rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "5th control rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "1st (left-hand) index rotor",
                type: "editableOption",
                value: I_ROTORS,
                defaultIndex: 0
            },
            {
                name: "1st index rotor initial value",
                type: "option",
                value: NUMBERS
            },
            {
                name: "2nd index rotor",
                type: "editableOption",
                value: I_ROTORS,
                defaultIndex: 0
            },
            {
                name: "2nd index rotor initial value",
                type: "option",
                value: NUMBERS
            },
            {
                name: "3rd (middle) index rotor",
                type: "editableOption",
                value: I_ROTORS,
                defaultIndex: 0
            },
            {
                name: "3rd index rotor initial value",
                type: "option",
                value: NUMBERS
            },
            {
                name: "4th index rotor",
                type: "editableOption",
                value: I_ROTORS,
                defaultIndex: 0
            },
            {
                name: "4th index rotor initial value",
                type: "option",
                value: NUMBERS
            },
            {
                name: "5th (right-hand) index rotor",
                type: "editableOption",
                value: I_ROTORS,
                defaultIndex: 0
            },
            {
                name: "5th index rotor initial value",
                type: "option",
                value: NUMBERS
            },
            {
                name: "SIGABA mode",
                type: "option",
                value: ["Encrypt", "Decrypt"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const sigabaSwitch = args[40];
        const cipherRotors = [];
        const controlRotors = [];
        const indexRotors = [];
        for (let i=0; i<5; i++) {
            const rotorWiring = args[i*3];
            cipherRotors.push(new CRRotor(rotorWiring, args[i*3+2], args[i*3+1]));
        }
        for (let i=5; i<10; i++) {
            const rotorWiring = args[i*3];
            controlRotors.push(new CRRotor(rotorWiring, args[i*3+2], args[i*3+1]));
        }
        for (let i=15; i<20; i++) {
            const rotorWiring = args[i*2];
            indexRotors.push(new IRotor(rotorWiring, args[i*2+1]));
        }
        const sigaba = new SigabaMachine(cipherRotors, controlRotors, indexRotors);
        let result;
        if (sigabaSwitch === "Encrypt") {
            result = sigaba.encrypt(input);
        } else if (sigabaSwitch === "Decrypt") {
            result = sigaba.decrypt(input);
        }
        return result;
    }

}
export default Sigaba;
