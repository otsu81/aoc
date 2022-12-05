import * as fs from 'fs'

function buildStacks(stacksInput: string): Map<string, string[]> {
  const stacks = stacksInput.split('\n')
  const index = stacks.pop()
  const stacksMap = new Map<string, string[]>()
  for (let i = 1; i < index.length; i += 4) {
    stacksMap.set(index[i], [])
  }

  for (let stack of stacks) {
    for (let i = 1; i < stack.length; i += 4) {
      if (stack[i] !== ' ') {
        const currStack = stacksMap.get(index[i])
        currStack.push(stack[i]) // remember to use .shift() to get last element later
        stacksMap.set(index[i], currStack)
      }
    }
  }
  return stacksMap
}

function extractInstructions(instructionsInput: string): string[][] {
  const rows = instructionsInput.split('\n')
  const instructions: string[][] = []
  const re = /[0-9]+/g
  for (let row of rows) {
    instructions.push(row.match(re))
  }
  return instructions
}

// instructions[0] = total blocks to move
// instructions[1] = from stack
// instructions[2] = to stack

function mover9000(instructions: string[], stacksMap: Map<string, string[]>) {
  for (let i = 0; i < parseInt(instructions[0]); i++) {
    const fromStack = stacksMap.get(instructions[1])
    const toStack = stacksMap.get(instructions[2])
    toStack.unshift(fromStack.shift())
    stacksMap.set(instructions[2], toStack)
    stacksMap.set(instructions[1], fromStack)
  }
  return stacksMap
}

function mover9001(instructions: string[], stacksMap: Map<string, string[]>) {
  const slicedPart = stacksMap.get(instructions[1]).slice(0, parseInt(instructions[0]))
  const slicedStack = stacksMap.get(instructions[1]).slice(parseInt(instructions[0]))
  const toStack = stacksMap.get(instructions[2])
  const stackedStack = slicedPart.concat(toStack)

  stacksMap.set(instructions[1], slicedStack)
  stacksMap.set(instructions[2], stackedStack)
  return stacksMap
}

function puzzle(
    stacks: string,
    instructions: string,
    moverFunction: (a: string[], b: Map<string, string[]>) => Map<string, string[]>
  ) {
  let stacksMap = buildStacks(stacks)
  const instr = extractInstructions(instructions)
  for (let i of instr) {
    stacksMap = moverFunction(i, stacksMap)
  }

  let finalPops: string = ''
  for (let val of stacksMap.values()) {
    finalPops += val.shift()
  }
  return finalPops
}

(async () => {
  const path = './src/05/'
  const fileName = '05.txt'
  const file = fs.readFileSync(path + fileName, 'utf-8')

  const [ stacks, instructions ] = file.split('\n\n');

  const puzzle1 = puzzle(stacks, instructions, mover9000)
  const puzzle2 = puzzle(stacks, instructions, mover9001)

  console.log({ puzzle1, puzzle2 })

})()
