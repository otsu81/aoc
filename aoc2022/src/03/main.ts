import * as fs from 'fs'
import * as path from 'path'
import scoreObject from './scoreObject.json'

function puzzle2(rucksacks: string[]) {
  let sum = 0;
  for (let i = 0; i < rucksacks.length; i += 3) {
    const [ r1, r2, r3 ] = [ rucksacks[i], rucksacks[i + 1], rucksacks[i +2] ]
    const intersection = new Set([...r1]
      .filter(char => r2.includes(char))
      .filter(char => r3.includes(char)))
    
    for (let char of intersection) sum += scoreObject[char]
  }

  console.log('puzzle2:', sum)
}

function puzzle1(rucksacks: string[]) {
  let sum = 0
  for (let rucksack of rucksacks) {
    const l = rucksack.length
    const [ comp1, comp2 ] = [ rucksack.slice(0, l/2), rucksack.slice(l/2) ]

    const intersection = new Set([...comp1].filter(char => comp2.includes(char)))

    for (let char of intersection) sum += scoreObject[char]
  }

  console.log('puzzle1:', sum)
}

(async () => {
  const fileName = './src/03/03.txt'
  const file = fs.readFileSync(fileName, 'utf-8')
  const rucksacks = file.split('\n')

  puzzle1(rucksacks)
  puzzle2(rucksacks)
  
})()
