// push constant 111
@111
D=A
// *SP=i
@SP
A=M
M=D
// SP++
@SP
M=M+1
// push constant 333
@333
D=A
// *SP=i
@SP
A=M
M=D
// SP++
@SP
M=M+1
// push constant 888
@888
D=A
// *SP=i
@SP
A=M
M=D
// SP++
@SP
M=M+1
// handle static pop 8
@SP
AM=M-1
D=M
@staticTest.8
M=D
// handle static pop 3
@SP
AM=M-1
D=M
@staticTest.3
M=D
// handle static pop 1
@SP
AM=M-1
D=M
@staticTest.1
M=D
// handle static push 3
@staticTest.3
D=M
@SP
A=M
M=D
// SP++
@SP
M=M+1
// handle static push 1
@staticTest.1
D=M
@SP
A=M
M=D
// SP++
@SP
M=M+1
// handle sub
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M-D
@SP
M=M+1
// handle static push 8
@staticTest.8
D=M
@SP
A=M
M=D
// SP++
@SP
M=M+1
// handle add
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=D+M
@SP
M=M+1