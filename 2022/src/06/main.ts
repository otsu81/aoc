import * as fs from 'fs'

function findMarker(signal: string, uniqueness: number): number | void {
  let charPos = uniqueness;
  do {
    const slice = signal.slice(charPos - uniqueness, charPos)
    const set = new Set(slice)
    if (set.size === uniqueness) break
    charPos++
  } while (charPos < signal.length)

  return charPos
}

(async () => {
  const path = './src/06/'
  const fileName = '06.txt'
  const file = fs.readFileSync(path + fileName, 'utf-8').split('\n')

  for (const row of file) {
    console.log('puzzle1:', findMarker(row, 4))
    console.log('puzzle2:', findMarker(row, 14))
  }
})()
