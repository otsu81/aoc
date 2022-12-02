import * as fs from 'fs'
import * as path from 'path'

function puzzle1(input: string) {
  let highestFound = Number.MIN_VALUE;
  let tempSum = 0;
  const rows = input.split('\n');
  for (let row of rows) {
    if (row === '') {
      if (tempSum > highestFound) highestFound = tempSum;
      tempSum = 0;
    } else {
      tempSum += Number(row)
    }
  }

  console.log(highestFound)

}

function puzzle2(input: string) {
  const calorieArray: number[] = [];
  let tempSum = 0;
  const rows = input.split('\n');
  for (let row of rows) {
    if (row === '') {
      calorieArray.push(tempSum)
      tempSum = 0;
    } else {
      tempSum += Number(row)
    }
  }

  calorieArray.sort((a: number, b: number) => { return b - a });

  let sum = 0
  for (let calories of calorieArray.slice(0, 3)) {
    sum += calories
  }

  console.log({ sum })

}

(async () => {
  const filename = '../src/01/in1.txt'
  const file = fs.readFileSync(path.join(__dirname, filename), 'utf-8');
  puzzle1(file);
  puzzle2(file);
})();
