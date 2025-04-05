const fs = require("fs");
const path = require("path");

/**
 * 从命令行读取文件内容
 * @returns {Promise<string>} - 返回文件内容的 Promise
 */
function readFileFromTerminal() {
  return new Promise((resolve, reject) => {
    // 获取命令行参数
    const args = process.argv.slice(2);

    // 获取文件路径
    const filePath = args[0];

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

function codeWriter({ filePath, parsedCommands }) {
  const inputDir = path.dirname(filePath); // 获取输入文件所在目录
  const hackFileName = path.basename(filePath, path.extname(filePath)) + ".asm"; // 替换扩展名为 .hack
  const hackFilePath = path.join(inputDir, hackFileName); // 拼接生成文件路径

  // 写入到新文件
  fs.writeFile(hackFilePath, parsedCommands, "utf8", (err) => {
    if (err) {
      console.error(`文件写入失败: ${err.message}`);
      process.exit(1);
    }
    console.log(`文件已成功生成: ${filePath}`);
  });
}

module.exports = {
  readFileFromTerminal,
  codeWriter,
};
