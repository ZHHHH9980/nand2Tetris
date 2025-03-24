const fs = require("fs");

// stack pointer
// SP -> next address will operate

// Implement local
// For Example: pop local 2
// Implementation (presudo code):
// addr = LCL + 2, SP--, *addr = *SP
// Actually, you may need A command or C command whatever

// the same as pop local i
// addr = LCL + i, SP--, *addr = *SP

// push local i
// addr = LCL + i, *SP = *addr, SP++

// (addr = LCL + i)
// @LCL
// D = M
// @i
// D = D + A

// @temp (temp = addr)
// M = D

// (SP--)
// @SP
// M = M - 1 (wrong)   // M = M - 1 只修改了 SP(RAM[0])，但 A 依然指向 SP(RAM[0]) 修改前的地址，SP  总之指向的是栈顶元素的下一个地址
// AM = M - 1 (right)
// D = M (D = *SP)

// @temp
// A = M
// D = M (*addr = *SP)

// finanl version

// (addr = LCL + i)
// @LCL
// D = M
// @i
// D = D + A

// (temp = addr)
// @R13
// M = D

// (SP--)
// @SP
// AM = M - 1
// D = M

// *addr = *SP
// @R13
// A = M
// M = D

// push segment i
// pop  segment i
// SP LCL ARG THIS THAT
// 0   1   2   3    4

// pop static 5
// ->
// @Foo.5
// M = D

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

function parser(data) {
  console.log("data", data);
}

function codeWriter({ filePath, parsedCommands }) {
  const inputDir = path.dirname(filePath); // 获取输入文件所在目录
  const hackFileName =
    path.basename(filePath, path.extname(filePath)) + ".hack"; // 替换扩展名为 .hack
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

async function main() {
  // 调用 readFileFromTerminal 函数获取文件内容
  const { filePath, data } = await readFileFromTerminal();

  const parsedCommands = parser(data);

  //   codeWriter({
  //     filePath,
  //     parsedCommands,
  //   });
}

main();
