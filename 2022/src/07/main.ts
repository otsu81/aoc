import * as fs from 'fs'

interface Directory {
  dirName: string,
  dirSize: number
}

const pwd: string[] = []
const dirMap = new Map<string, Directory>()

function getAbsPath(path = pwd): string {
  const absPath = '/' + path.join('/');
  return absPath
}

function listDir() {
  const absPath = getAbsPath()
  if (!dirMap.has(absPath)) {
    const dirName = pwd[pwd.length - 1] || '/';
    dirMap.set(absPath, {
      dirName,
      dirSize: 0
    })
  }
}

function changeDir(path: string) {
  if (path === '/') pwd.length = 0
  else if (path === '..') pwd.pop()
  else pwd.push(path)
}

function executeCommand(cmd: string) {
  const [ __, word, path ] = cmd.split(' ')
  if (word === 'cd') changeDir(path)
  else listDir()
}

function updateParentDirSize(childPath: string[], fileSize: number) {
  if (childPath.length > 0) {
    const parent = childPath.slice(0, -1)
    dirMap.get(getAbsPath(parent)).dirSize += fileSize
    updateParentDirSize(parent, fileSize)
  }
}
function addLineToPwd(output: string) {
  const [ prop ] = output.split(' ')
  if (prop !== 'dir') {
    const size = parseInt(prop, 10);
    dirMap.get(getAbsPath()).dirSize += size
    updateParentDirSize(pwd, size)
  }
}

function constructDirMap(readOut: string[]) {
  readOut.forEach((line) => {
    if (line.startsWith('$')) executeCommand(line)
    else {
      addLineToPwd(line)
    }
  })
}

function puzzle1() {
  let sum = 0;
  for (const dir of dirMap.values()) {
    if (dir.dirSize < 100000) sum += dir.dirSize
  }
  return sum
}

function puzzle2() {
  const totalFilespace = 70000000
  const desired = 30000000
  const unused = totalFilespace - dirMap.get('/').dirSize
  const needed = desired - unused

  let smallestSuitableNum = Number.MAX_SAFE_INTEGER
  for (const dir of dirMap.values()) {
    if (dir.dirSize > needed && dir.dirSize < smallestSuitableNum) smallestSuitableNum = dir.dirSize
  }

  return smallestSuitableNum
}

(async () => {
  const path = './src/07/'
  const fileName = '07.txt'
  const file = fs.readFileSync(path + fileName, 'utf-8').split('\n')

  constructDirMap(file)

  console.log('puzzle1:', puzzle1())
  console.log('puzzle2:', puzzle2())
})()
