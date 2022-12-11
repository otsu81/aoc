import * as fs from 'fs'

interface MatrixStructure {
  rows: number[][],
  cols: number[][]
}

function makeMatrix(input: string[]): MatrixStructure {
  const rows: number[][] = []
  const cols: number[][] = []
  for (let i = 0; i < input[0].length; i++) {
    const row: number[] = []
    const col: number[] = []
    for (let j = 0; j < input.length; j++) {
      row.push(parseInt(input[i][j]))
      col.push(parseInt(input[j][i]))
    }
    rows.push(row)
    cols.push(col)
  }

  return { rows, cols }
}

function visibleTree(nums: number[], pos: number): boolean {
  const num = nums[pos]
  let visWest = true
  for (let i = 0; i < pos; i++) {
    if (nums[i] >= nums[pos]) {
      visWest = false
      break
    }
  }

  let visEast = true
  for (let i = nums.length - 1; i > pos; i--) {
    if (nums[i] >= num) {
      visEast = false
      break;
    }
  }
  return visWest || visEast
}

function visibilityScore(nums: number[], pos: number) {
  let westScore = 0
  for (let i = pos - 1; i >= 0; i--) {
    westScore++
    if (nums[i] >= nums[pos]) {
      break
    }
  }
  let eastScore = 0
  for (let i = pos + 1; i < nums.length; i++) {
    eastScore++
    if (nums[i] >= nums[pos]) {
      break
    }
  }
  return westScore * eastScore
}

function puzzle1(matrix: MatrixStructure) {
  let sum = 0
  const edges = matrix.rows.length * 2 + matrix.rows[0].length * 2 - 4
  sum += edges
  for (let i = 1; i < matrix.rows.length - 1; i++) {
    for (let j = 1; j < matrix.rows.length - 1; j++) {
      const visibleOnRow = visibleTree(matrix.rows[i], j)
      const visibleOnCol = visibleTree(matrix.cols[j], i)
      if (visibleOnCol || visibleOnRow) sum++
    }
  }
  return sum
}

function puzzle2(matrix: MatrixStructure) {
  let highest = Number.MIN_SAFE_INTEGER
  for (let i = 1; i < matrix.rows.length - 1; i++) {
    for (let j = 1; j < matrix.rows.length - 1; j++) {
      const rowScore = visibilityScore(matrix.rows[i], j)
      const colScore = visibilityScore(matrix.cols[j], i)
      if (rowScore*colScore > highest) highest = rowScore*colScore
    }
  }
  return highest
}

(async () => {
  const path = './src/08/'
  const fileName = '08.txt'
  const file = fs.readFileSync(path + fileName, 'utf-8').split('\n')

  const matrix = makeMatrix(file)
  console.log('puzzle 1:', puzzle1(matrix))
  console.log('puzzle 2:', puzzle2(matrix))
})()
