// 引入文件系统模块
const { debug } = require("console");
const fs = require("fs");
const path = require("path");

let variableSymbolStartIndex = 16;
let variableRecord = {};

let predefinedSymbolMap = {
  SCREEN: 16384,
  KBD: 24576,
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4,
};

Array(16)
  .fill(1)
  .forEach((_, index) => {
    predefinedSymbolMap[`R${index}`] = index;
  });

/**
 * 提取字符串中括号内的内容
 * @param {string} str - 输入字符串，例如 "(xxx)"
 * @returns {string} - 返回括号内的内容，例如 "xxx"
 */
function _extractParenthesesContent(str) {
  // 使用正则表达式提取括号内容
  const match = str.match(/\((.*?)\)/); // 匹配括号内的内容
  return match ? match[1] : ""; // 如果匹配成功，返回括号内的内容，否则返回空字符串
}

const leftSide2DestBinaryCode = {
  M: "001",
  D: "010",
  MD: "011",
  A: "100",
  AM: "101",
  AD: "110",
  AMD: "111",
};

const rightSide2CompBinaryCode = {
  0: {
    0: "101010",
    1: "111111",
    ["-1"]: "111010",
    D: "001100",
    A: "110000",
    ["!D"]: "001101",
    ["!A"]: "110001",
    ["-D"]: "001111",
    ["-A"]: "110011",
    ["D+1"]: "011111",
    ["A+1"]: "110111",
    ["D-1"]: "001110",
    ["A-1"]: "110010",
    ["D+A"]: "000010",
    ["D-A"]: "010011",
    ["A-D"]: "000111",
    ["D&A"]: "000000",
    ["D|A"]: "010101",
  },
  1: {
    M: "110000",
    ["!M"]: "110001",
    ["-M"]: "110011",
    ["M+1"]: "110111",
    ["M-1"]: "110010",
    ["D+M"]: "000010",
    ["D-M"]: "010011",
    ["M-D"]: "000111",
    ["D&M"]: "000000",
    ["D|M"]: "010101",
  },
};

const _JUMPCode = {
  JGT: "001",
  JEQ: "010",
  JGE: "011",
  JLT: "100",
  JNE: "101",
  JLE: "110",
  JMP: "111",
};

const handler = {
  get(target, prop) {
    // 如果属性在目标对象中存在，返回它的值
    if (prop in target) {
      return target[prop];
    }

    // 如果属性不存在，返回默认值
    return "000";
  },
};

// 使用 Proxy 创建一个代理对象
const JUMPCodeMap = new Proxy(_JUMPCode, handler);
const destCodeMap = new Proxy(leftSide2DestBinaryCode, handler);

/**
 * 从命令行读取文件内容
 * @returns {Promise<string>} - 返回文件内容的 Promise
 */
function readFileFromTerminal() {
  return new Promise((resolve, reject) => {
    // 获取命令行参数
    const args = process.argv.slice(2);

    // 检查参数是否正确
    if (args.length !== 2 || args[0] !== "assembler") {
      console.error("用法: node assembler.js assembler <文件名>");
      process.exit(1);
    }

    // 获取文件路径
    const filePath = args[1];

    // 读取文件内容
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(`文件读取失败: ${err.message}`);
      } else {
        resolve({ filePath, data });
      }
    });
  });
}

function _isAInstruction(struction) {
  return struction.startsWith("@");
}

function _isLabelSymbolLine(struction) {
  return struction.startsWith("(");
}

function _isLabelSymbol(symbol, labelRecord) {
  return (
    Number.isInteger(predefinedSymbolMap[symbol]) ||
    labelRecord[symbol] ||
    variableRecord[symbol]
  );
}

function _convertSymbol2DecimalNumber(symbol, labelRecord) {
  return Number.isInteger(predefinedSymbolMap[symbol])
    ? predefinedSymbolMap[symbol]
    : labelRecord[symbol] || variableRecord[symbol];
}

function _convertAInstruction2BinaryCode(instruction, labelRecord) {
  const [, symbol] = instruction.split("@");

  let decimalNumer;

  if (symbol === "32") {
    debugger;
  }

  // @label
  if (_isLabelSymbol(symbol, labelRecord)) {
    decimalNumer = _convertSymbol2DecimalNumber(symbol, labelRecord);
  } else if (Number.isInteger(Number(symbol))) {
    // @2
    decimalNumer = symbol;
  } else {
    // @i variable
    decimalNumer = variableSymbolStartIndex;
    variableRecord[symbol] = variableSymbolStartIndex;
    variableSymbolStartIndex++;
  }

  const binaryCode = Number(decimalNumer).toString(2).padStart(16, "0");

  // if (binaryCode === "0000000000010010") {
  //   debugger;
  // }

  return binaryCode;
}

function checkHasJumpCode(instruction) {
  return instruction.includes(";");
}

function checkHasCompCode(instruction) {
  return instruction.includes("=");
}

function _convertCInstruction2BinaryCode(instruction) {
  // D=D-M
  // D;JMP
  // 0;JMP
  // D=D+1;JMP
  let hasJumpCode = checkHasJumpCode(instruction);
  let jumpCode = hasJumpCode ? instruction.split(";")[1] : "";

  let restCommand = hasJumpCode ? instruction.split(";")[0] : instruction;
  let hasCompCode = checkHasCompCode(restCommand);

  // comp 是一定存在，dest 可能没有
  // D=D-M
  // 0
  let compCommand = hasCompCode ? restCommand.split("=")[1] : restCommand;
  let destCommand = hasCompCode ? restCommand.split("=")[0] : "";

  const destBinaryCode = destCodeMap[destCommand];

  const needCalculateMRegister = compCommand.includes("M");
  const a = needCalculateMRegister ? 1 : 0;

  const compBinaryCode = rightSide2CompBinaryCode[a][compCommand];

  const res = `111${a}${compBinaryCode}${destBinaryCode}${JUMPCodeMap[jumpCode]}`;

  return res;
}

function handleLabelSymbol() {
  let lineNumber = 0;
  let labelRecord = {};

  return {
    addLineNumber: () => {
      lineNumber++;
    },
    recordLabelSymbol: (str) => {
      labelRecord[str] = lineNumber;
      predefinedSymbolMap = {
        ...predefinedSymbolMap,
        ...labelRecord,
      };
    },
    labelRecord,
  };
}

function _skipEmptylineAndComment(arr) {
  const res = arr
    .map((lineStr) => lineStr.trim())
    .filter(Boolean)
    .filter((trimedStr) => !trimedStr.startsWith("//"));

  return res;
}

async function assembler() {
  try {
    // 调用 readFileFromTerminal 函数获取文件内容
    const { filePath, data } = await readFileFromTerminal();

    const { addLineNumber, recordLabelSymbol, labelRecord } =
      handleLabelSymbol();

    const resultStr = _skipEmptylineAndComment(data.split("\n"))
      .map((lineStr) => {
        // the line has Label symbol, skip
        if (_isLabelSymbolLine(lineStr)) {
          const label = _extractParenthesesContent(lineStr);
          recordLabelSymbol(label);
        } else {
          // the line without label symbol, make line number++
          addLineNumber();
        }

        return lineStr;
      })
      .filter((str) => !_isLabelSymbolLine(str))
      .map((str) => {
        if (_isAInstruction(str)) {
          return _convertAInstruction2BinaryCode(str, labelRecord);
        }

        return _convertCInstruction2BinaryCode(str);
      })
      .join("\n");

    const inputDir = path.dirname(filePath); // 获取输入文件所在目录

    const hackFileName =
      path.basename(filePath, path.extname(filePath)) + ".hack"; // 替换扩展名为 .hack
    const hackFilePath = path.join(inputDir, hackFileName); // 拼接生成文件路径

    // 写入到新文件
    fs.writeFile(hackFilePath, resultStr, "utf8", (err) => {
      if (err) {
        console.error(`文件写入失败: ${err.message}`);
        process.exit(1);
      }
      console.log(`文件已成功生成: ${filePath}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

assembler();
