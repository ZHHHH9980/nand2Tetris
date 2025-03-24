@SCREEN
D=A
@addr
M=D // RAM[addr] = SCREEN

@8192
D=A
@n
M=D // RAM[n] = 8192

@i
M=1 // RAM[i] = 1

(LOOP)
@i
D=M
@n
D=D-M
@STOP
D;JGT // i - n > 0 ? goto STOP

@addr
A=M  // A = RAM[addr]
M=-1 // RAM[RAM[addr]] = -1

@addr
M=M+1 // addr = addr + 1

@i
M=M+1
@LOOP
0;JMP

(STOP)
@STOP
0;JMP

