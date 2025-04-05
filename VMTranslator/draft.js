// stack pointer
// SP -> next address will operate

/* Implement local */
// For Example: pop local 2
// Implementation (presudo code):
// addr = LCL + 2, SP--, *addr = *SP
// Actually, you may need A command or C command whatever

// the same as pop local i
// addr = LCL + i, SP--, *addr = *SP

// push local i
// addr = LCL + i, *SP = *addr, SP++

// final version

// For Example: pop local 2
// Implementation (presudo code):
// addr = LCL + 2, SP--, *addr = *SP
// 1. addr = LCL + i
// @1
// A = M
// D = A
// @i
// D = D + A

// 2. temp = addr
// @R13
// M = D

// 3. SP--
// @0
// M = M - 1

// 4. *addr = *SP
// @0
// A = M (A = addr)
// D = M (D = *SP)
// @R13
// A = M
// M = D

// push local i
// addr = LCL + i, *SP = *addr, SP++

// 1. addr = LCL + i
// @1
// D = M
// @i
// A = D + A
// D = M (D = *addr)

// 2. *SP = *addr
// @0
// A = M
// M = D

// 3. SP++
// @0
// M = M + 1

// push segment i
// pop  segment i
// SP LCL ARG THIS THAT
// 0   1   2   3    4

// pop static 5
// ->
// @Foo.5
// M = D

/* Implement constant */

// push constant i
// *SP = i, SP++
// no constant pop

/* Implement temp */
// Mapped on RAM locations 5 to 12

// push temp i
// addr = 5 + i, *SP = *addr, SP++

// pop temp i
// addr = 5 + i, SP--, *addr = *SP

// push temp i
// addr = 5 + i

// @5 + i
// D = M
// @0
// A = M
// M = D

// SP++
// @0
// M = M + 1

// pop temp i
// addr = 5 + i

// SP--
// @0
// AM = M - 1
// D = M (D = *SP)

// @5 + i
// M = D (*addr = *SP)

/* Implement pointer */
// accessing pointer 0 should result in accessing THIS
// accessing pointer 1 should result in accessing THAT

// push pointer  0/1  -> *SP = THIS/THAT, SP++
// pop  pointer  0/1  -> SP--, THIS/THAT = *SP

// Arithmetic Commands
// add
// SP--, D = *SP, SP--, M = *SP + D, SP++

// @0
// M = M - 1
// A = M
// D = M

// @0
// M = M - 1
// A = M
// M = M + D

// @0
// M = M + 1

// sub
// SP--, D = *SP, SP--, M = *SP - D, SP++

// @0
// M = M - 1
// A = M
// D = M

// @0
// M = M - 1
// A = M
// M = M - D

// @0
// M = M + 1

// implement eq

// @0
// AM = M - 1 (SP--)
// D = M (D = y)
// @0
// AM = M - 1 (SP--)
// D = M - D (D = x - y)

// @EQ_TRUE
// D; JEQ (if x - y == 0, if true jump to EQ_TRUE)
// @0 (else)
// A = M
// M = 0
// @EQ_END
// 0; JMP

// (EQ_TRUE)
// @-1
// D=A
// @0
// M = D
// (EQ_END)
// @0
// M = M + 1 (SP++)

// implement and
// @0
// AM = M - 1 (SP--)
// D = M (D = y)
// @0
// AM = M - 1 (SP--)
// D = M&D (D = x & y)
// M = D
// @0
// M = M + 1 (SP++)

// implement neg
// @0
// AM = M - 1 (SP--)
// D = -M
// M = D
// @0
// M = M + 1 (SP++)
