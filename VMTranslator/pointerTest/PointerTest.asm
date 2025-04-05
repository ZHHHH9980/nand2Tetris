// push constant 3030
@3030
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle pop pointer 0
// SP--
@0
AM=M-1
D=M
@3
M=D
// push constant 3040
@3040
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle pop pointer 1
// SP--
@0
AM=M-1
D=M
@4
M=D
// push constant 32
@32
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle this pop
// 1. addr = LCL/ARG/THIS/THAT + i
@3
A=M
D=A
@2
D=D+A
// 2. temp = addr
@R13
M=D
// 3. SP--
@0
M=M-1
// 4. *addr = *SP
@0
A=M
D=M
@R13
A=M
M=D
// push constant 46
@46
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle that pop
// 1. addr = LCL/ARG/THIS/THAT + i
@4
A=M
D=A
@6
D=D+A
// 2. temp = addr
@R13
M=D
// 3. SP--
@0
M=M-1
// 4. *addr = *SP
@0
A=M
D=M
@R13
A=M
M=D
// handle push pointer 0
@3
D=M
@0
A=M
M=D
// SP++
@0
M=M+1
// handle push pointer 1
@4
D=M
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
// handle this push
// 1. addr = LCL/ARG/THIS/THAT + i
@3
D=M
@2
A=D+A
D=M
// 2. *SP = *addr
@0
A=M
M=D
// 3. SP++
@0
M=M+1
// handle sub
@0
M=M-1
A=M
D=M
@0
M=M-1
A=M
M=M-D
@0
M=M+1
// handle that push
// 1. addr = LCL/ARG/THIS/THAT + i
@4
D=M
@6
A=D+A
D=M
// 2. *SP = *addr
@0
A=M
M=D
// 3. SP++
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