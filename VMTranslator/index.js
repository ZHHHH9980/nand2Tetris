const { readFileFromTerminal, codeWriter } = require("./fileOperation");
const parser = require("./parser");

async function main() {
  // 调用 readFileFromTerminal 函数获取文件内容
  const { filePath, data } = await readFileFromTerminal();

  const parsedCommands = parser(data);

  codeWriter({
    filePath,
    parsedCommands,
  });
}

main();
