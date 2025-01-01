import * as fs from 'fs'
import * as path from 'path'

function pairSplitter(pair: string): Array<Array<number>> {
  const s = pair.split(',')
  const splitted = [
    s[0].split('-'),
    s[1].split('-'),
  ]
  const numbers = [
    [ parseInt(splitted[0][0]), parseInt(splitted[0][1]) ],
    [ parseInt(splitted[1][0]), parseInt(splitted[1][1]) ],
  ]
  return numbers
}

function puzzle1(pairs: string[]) {
  let sum = 0
  for (let pair of pairs) {
    const spl = pairSplitter(pair)
    if (spl[0][0] >= spl[1][0] && spl[0][1] <= spl[1][1]) {
      sum++
    } else if (spl[1][0] >= spl[0][0] && spl[1][1] <= spl[0][1]) {
      sum++
    }
  }
  console.log('puzzle1:', sum)
}

function puzzle2(pairs: string[]) {
  let sum = 0
  for (let pair of pairs) {
    const spl = pairSplitter(pair)
    if (spl[0][0] >= spl[1][0] && spl[0][0] <= spl[1][1]) {
      sum++
    } else if (spl[0][1] >= spl[1][0] && spl[0][0] <= spl[1][1]) {
      sum++
    }
  }
  console.log('puzzle2:', sum)
}

(async () => {
  const fileName = './src/04/04.txt'
  const file = fs.readFileSync(fileName, 'utf-8')
  const pairs = file.split('\n')

  // const test = ['18-30,9-19']
  // puzzle1(pairs)
  puzzle2(pairs)

})()
