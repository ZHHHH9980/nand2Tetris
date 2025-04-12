function _invalidLine(str) {
  return !str.startsWith("//") && str.trim() !== "";
}

function _isStackOperation(str) {
  return str.startsWith("push") || str.startsWith("pop");
}

function _handleArthmeticOperation(operation) {
  // add
  if (operation === "add") {
    return [
      "// handle add",
      "@SP",
      "M=M-1",
      "A=M",
      "D=M",
      "@SP",
      "M=M-1",
      "A=M",
      "M=D+M",
      "@SP",
      "M=M+1",
    ];
  }

  // sub
  return [
    "// handle sub",
    "@SP",
    "M=M-1",
    "A=M",
    "D=M",
    "@SP",
    "M=M-1",
    "A=M",
    "M=M-D",
    "@SP",
    "M=M+1",
  ];
}

const _logicOperationAndCountMap = {
  eq: {
    count: -1,
    command: "JEQ",
  },
  gt: {
    count: -1,
    command: "JGT",
  },
  lt: {
    count: -1,
    command: "JLT",
  },
};

const _logicOperationMap = {
  and: "D&M",
  or: "D|M",
  not: "!M",
};

const _handleLogicCommand = (operation) => {
  if (operation === "eq" || operation === "gt" || operation === "lt") {
    const uppercaseOperation = operation.toUpperCase();
    _logicOperationAndCountMap[operation].count += 1;

    return [
      `// handle ${operation}`,
      "@SP",
      "AM=M-1",
      "D=M",
      "@SP",
      "AM=M-1",
      "D=M-D",
      "// if true",
      `@${uppercaseOperation}_TRUE_${_logicOperationAndCountMap[operation].count}`,
      `D;${_logicOperationAndCountMap[operation].command}`,
      "// else false",
      "@SP",
      "A=M",
      "M=0",
      `@${uppercaseOperation}_END_${_logicOperationAndCountMap[operation].count}`,
      "0;JMP",
      `(${uppercaseOperation}_TRUE_${_logicOperationAndCountMap[operation].count})`,
      "@1",
      "D=-A",
      "@SP",
      "A=M",
      "M=D",
      "// SP++",
      `(${uppercaseOperation}_END_${_logicOperationAndCountMap[operation].count})`,
      "@SP",
      "M=M+1",
    ];
  } else if (operation === "and" || operation === "or") {
    return [
      `// handle ${operation}`,
      "@SP",
      "AM=M-1",
      "D=M",
      "@SP",
      "AM=M-1",
      `M=${_logicOperationMap[operation]}`,
      "// SP++",
      "@SP",
      "M=M+1",
    ];
  }

  // handle neg or not
  return [
    `// handle ${operation}`,
    "@SP",
    "AM=M-1",
    operation === "neg" ? "D=-M" : "D=!M",
    "M=D",
    "// SP++",
    "@SP",
    "M=M+1",
  ];
};

const normalSegmentOffsetMap = {
  local: "1",
  argument: "2",
  this: "3",
  that: "4",
};

// push pointer  0/1  -> *SP = THIS/THAT, SP++
// @offset
// D = M (D = THIS/THAT)
// @SP
// A = M (A = RAM[0])
// M = D (*SP = D)
// @SP
// M = M + 1 (SP++)

// pop  pointer  0/1  -> SP--, THIS/THAT = *SP
// @SP
// AM = M - 1 (SP--)
// D = M (D = *SP)
// @offset
// M = D
function _handlePointerOperation(operation, index) {
  const offset =
    index === 0
      ? normalSegmentOffsetMap["this"]
      : normalSegmentOffsetMap["that"];

  if (operation === "push") {
    return [
      `// handle push pointer ${index}`,
      `@${offset}`,
      "D=M",
      "@SP",
      "A=M",
      "M=D",
      "// SP++",
      "@SP",
      "M=M+1",
    ];
  }

  return [
    `// handle pop pointer ${index}`,
    "// SP--",
    "@SP",
    "AM=M-1",
    "D=M",
    `@${offset}`,
    "M=D",
  ];
}

function _handleTempSegment(operation, index) {
  if (operation === "push") {
    return [
      `// handle push temp ${index}`,
      `@${5 + index}`,
      "D=M",
      "@SP",
      "A=M",
      "M=D",
      "// SP++",
      "@SP",
      "M=M+1",
    ];
  }

  return [
    `// handle pop temp ${index}`,
    "// SP--",
    "@SP",
    "AM=M-1",
    "D=M",
    `@${5 + index}`,
    "M=D",
  ];
}

function _handleConstantSegment(operation, index) {
  const comment = `// ${operation} constant ${index}`;

  return [
    comment,
    `@${index}`,
    "D=A",
    "// *SP=i",
    "@SP",
    "A=M",
    "M=D",
    "// SP++",
    "@SP",
    "M=M+1",
  ];
}

/**
 * Handles the translation of VM commands for normal memory segments (LCL, ARG, THIS, THAT).
 *
 * @param {string} operation - The VM operation to perform, either "push" or "pop".
 * @param {string} segment - The memory segment to operate on (e.g., "local", "argument", "this", "that").
 * @param {number} index - The index within the memory segment to operate on.
 * @returns {string[]} An array of Hack assembly instructions corresponding to the VM command.
 */
function _handleNormalSegment(operation, segment, index) {
  if (operation === "push") {
    return [
      `// handle ${segment} push`,

      "// 1. addr = LCL/ARG/THIS/THAT + i",
      `@${normalSegmentOffsetMap[segment]}`,
      "D=M",
      `@${index}`,
      "A=D+A",
      "D=M",

      "// 2. *SP = *addr",
      "@SP",
      "A=M",
      "M=D",

      "// 3. SP++",
      "@SP",
      "M=M+1",
    ];
  }

  return [
    `// handle ${segment} pop`,

    "// 1. addr = LCL/ARG/THIS/THAT + i",
    `@${normalSegmentOffsetMap[segment]}`,
    "A=M",
    "D=A",
    `@${index}`,
    "D=D+A",

    "// 2. temp = addr",
    "@R13",
    "M=D",

    "// 3. SP--",
    "@SP",
    "M=M-1",

    "// 4. *addr = *SP",
    "@SP",
    "A=M",
    "D=M",
    "@R13",
    "A=M",
    "M=D",
  ];
}

function _handleStaticSegment(operation, index, fileName) {
  if (operation === "push") {
    return [
      `// handle static push ${index}`,
      `@${fileName}.${index}`,
      "D=M",
      "@SP",
      "A=M",
      "M=D",
      "// SP++",
      "@SP",
      "M=M+1",
    ];
  }

  return [
    `// handle static pop ${index}`,
    "@SP",
    "AM=M-1",
    "D=M",
    `@${fileName}.${index}`,
    "M=D",
  ];
}

function _convertVMCode2ASMCode(fileName) {
  return function (str) {
    if (_isStackOperation(str)) {
      const [operation, segment, i] = str.split(" ");
      const index = Number(i);

      if (segment in normalSegmentOffsetMap) {
        return _handleNormalSegment(operation, segment, index);
      } else if (segment === "constant") {
        return _handleConstantSegment(operation, index);
      } else if (segment === "temp") {
        return _handleTempSegment(operation, index);
      } else if (segment === "pointer") {
        return _handlePointerOperation(operation, index);
      } else if (segment === "static") {
        return _handleStaticSegment(operation, index, fileName);
      }
    }

    if (str === "add" || str === "sub") {
      return _handleArthmeticOperation(str);
    }

    return _handleLogicCommand(str);
  };
}

function parser(dataStr, fileName) {
  const validLines = dataStr
    .split("\n")
    .filter(_invalidLine)
    .map(_convertVMCode2ASMCode(fileName))
    .map((commandArr) => commandArr.join("\n"));

  return validLines.join("\n");
}

module.exports = parser;
