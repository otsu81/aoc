import * as fs from 'fs'
import * as path from 'path'

interface OutcomeMap {
  [key: string]: number
}

const outcomeMap1 = {
  'A X': 4, // rock rock
  'A Y': 8, // rock paper
  'A Z': 3, // rock scissor
  'B X': 1, // paper rock
  'B Y': 5, // paper paper
  'B Z': 9, // paper scissor
  'C X': 7, // scissor rock
  'C Y': 2, // scissor paper
  'C Z': 6, // scissor scissor
};

const outcomeMap2 = {
  'A X': 0 + 3, // lose against rock with scissor
  'A Y': 3 + 1, // draw against rock with rock
  'A Z': 6 + 2, // win against rock with paper
  'B X': 0 + 1, // lose against paper with rock
  'B Y': 3 + 2, // draw against paper with paper
  'B Z': 6 + 3, // win against paper with scissor
  'C X': 0 + 2, // lose against scissor with paper
  'C Y': 3 + 3, // draw against scissor with scissor
  'C Z': 6 + 1, // win against scissor with rock
};


function puzzle(rows: string[], outcomeMap: OutcomeMap) {
  let totalScore = 0;
  for (let row of rows) {
    totalScore += outcomeMap[row]
  }
  return totalScore
}

(async () => {
  const filename = '../../src/02/in02.txt'
  const file = fs.readFileSync(path.join(__dirname, filename), 'utf-8')
  const rows = file.split('\n');

  console.log('puzzle 1:', puzzle(rows, outcomeMap1))
  console.log('puzzle 2:', puzzle(rows, outcomeMap2))

})()
