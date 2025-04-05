// push constant 17
@17
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 17
@17
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle eq
@0
AM=M-1
D=M
@0
AM=M-1
D=M-D
// if true
@EQ_TRUE_0
D;JEQ
// else false
@0
A=M
M=0
@EQ_END_0
0;JMP
(EQ_TRUE_0)
@1
D=-A
@0
A=M
M=D
// SP++
(EQ_END_0)
@0
M=M+1
// push constant 17
@17
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 16
@16
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle eq
@0
AM=M-1
D=M
@0
AM=M-1
D=M-D
// if true
@EQ_TRUE_1
D;JEQ
// else false
@0
A=M
M=0
@EQ_END_1
0;JMP
(EQ_TRUE_1)
@1
D=-A
@0
A=M
M=D
// SP++
(EQ_END_1)
@0
M=M+1
// push constant 16
@16
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 17
@17
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle eq
@0
AM=M-1
D=M
@0
AM=M-1
D=M-D
// if true
@EQ_TRUE_2
D;JEQ
// else false
@0
A=M
M=0
@EQ_END_2
0;JMP
(EQ_TRUE_2)
@1
D=-A
@0
A=M
M=D
// SP++
(EQ_END_2)
@0
M=M+1
// push constant 892
@892
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 891
@891
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle lt
@0
AM=M-1
D=M
@0
AM=M-1
D=M-D
// if true
@LT_TRUE_0
D;JLT
// else false
@0
A=M
M=0
@LT_END_0
0;JMP
(LT_TRUE_0)
@1
D=-A
@0
A=M
M=D
// SP++
(LT_END_0)
@0
M=M+1
// push constant 891
@891
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 892
@892
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle lt
@0
AM=M-1
D=M
@0
AM=M-1
D=M-D
// if true
@LT_TRUE_1
D;JLT
// else false
@0
A=M
M=0
@LT_END_1
0;JMP
(LT_TRUE_1)
@1
D=-A
@0
A=M
M=D
// SP++
(LT_END_1)
@0
M=M+1
// push constant 891
@891
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 891
@891
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle lt
@0
AM=M-1
D=M
@0
AM=M-1
D=M-D
// if true
@LT_TRUE_2
D;JLT
// else false
@0
A=M
M=0
@LT_END_2
0;JMP
(LT_TRUE_2)
@1
D=-A
@0
A=M
M=D
// SP++
(LT_END_2)
@0
M=M+1
// push constant 32767
@32767
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 32766
@32766
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle gt
@0
AM=M-1
D=M
@0
AM=M-1
D=M-D
// if true
@GT_TRUE_0
D;JGT
// else false
@0
A=M
M=0
@GT_END_0
0;JMP
(GT_TRUE_0)
@1
D=-A
@0
A=M
M=D
// SP++
(GT_END_0)
@0
M=M+1
// push constant 32766
@32766
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 32767
@32767
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle gt
@0
AM=M-1
D=M
@0
AM=M-1
D=M-D
// if true
@GT_TRUE_1
D;JGT
// else false
@0
A=M
M=0
@GT_END_1
0;JMP
(GT_TRUE_1)
@1
D=-A
@0
A=M
M=D
// SP++
(GT_END_1)
@0
M=M+1
// push constant 32766
@32766
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 32766
@32766
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle gt
@0
AM=M-1
D=M
@0
AM=M-1
D=M-D
// if true
@GT_TRUE_2
D;JGT
// else false
@0
A=M
M=0
@GT_END_2
0;JMP
(GT_TRUE_2)
@1
D=-A
@0
A=M
M=D
// SP++
(GT_END_2)
@0
M=M+1
// push constant 57
@57
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 31
@31
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// push constant 53
@53
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
// push constant 112
@112
D=A
// *SP=i
@0
A=M
M=D
// SP++
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
// handle neg
@0
AM=M-1
D=-M
M=D
// SP++
@0
M=M+1
// handle and
@0
AM=M-1
D=M
@0
AM=M-1
M=D&M
// SP++
@0
M=M+1
// push constant 82
@82
D=A
// *SP=i
@0
A=M
M=D
// SP++
@0
M=M+1
// handle or
@0
AM=M-1
D=M
@0
AM=M-1
M=D|M
// SP++
@0
M=M+1
// handle not
@0
AM=M-1
D=!M
M=D
// SP++
@0
M=M+1