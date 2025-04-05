// push constant 7
@7
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 8
@8
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle add
@0
M=M-1
A=M
D=M
@0
M=M-1
A=M
M=D+M
@0
M=M+1