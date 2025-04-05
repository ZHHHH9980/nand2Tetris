// push constant 10
@10
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle local pop
// 1. addr = LCL/ARG/THIS/THAT + i
@1
A=M
D=A
@0
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
// push constant 21
@21
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 22
@22
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle argument pop
// 1. addr = LCL/ARG/THIS/THAT + i
@2
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
// handle argument pop
// 1. addr = LCL/ARG/THIS/THAT + i
@2
A=M
D=A
@1
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
// push constant 36
@36
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
// push constant 42
@42
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 45
@45
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
@5
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
// handle that pop
// 1. addr = LCL/ARG/THIS/THAT + i
@4
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
// push constant 510
@510
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle pop temp 6
// SP--
@0
AM=M-1
D=M
@11
M=D
// handle local push
// 1. addr = LCL/ARG/THIS/THAT + i
@1
D=M
@0
A=D+A
D=M
// 2. *SP = *addr
@0
A=M
M=D
// 3. SP++
@0
M=M+1
// handle that push
// 1. addr = LCL/ARG/THIS/THAT + i
@4
D=M
@5
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
// handle argument push
// 1. addr = LCL/ARG/THIS/THAT + i
@2
D=M
@1
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
// handle this push
// 1. addr = LCL/ARG/THIS/THAT + i
@3
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
// handle this push
// 1. addr = LCL/ARG/THIS/THAT + i
@3
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
// handle push temp 6
@11
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