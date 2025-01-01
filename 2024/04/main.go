package main

import (
	"os"
	"strings"
)

var m [][]string

var directions = []struct{ dx, dy int }{
	{0, 1},
	{1, 1},
	{1, 0},
	{1, -1},
	{0, -1},
	{-1, -1},
	{-1, 0},
	{-1, 1},
}

func hasXmas(lines []string, i, j int, d []int) bool {
	xmas := "XMAS"
	n, m := len(lines), len(lines[0])
	for k, x := range xmas {
		ii := i + k*d[0]
		jj := j + k*d[1]
		if !(0 <= ii && ii < n && 0 <= jj && jj < m) {
			return false
		}
		if rune(lines[ii][jj]) != x {
			return false
		}
	}
	return true
}

func part1(lines []string) {
	count := 0
	n, m := len(lines), len(lines[0])
	for i := 0; i < n; i++ {
		for j := 0; j < m; j++ {
			for _, d := range directions {
				if hasXmas(lines, i, j, []int{d.dx, d.dy}) {
					count++
				}
			}
		}
	}
	println(count)
}


func main() {
	f, _ := os.ReadFile("input.txt")
	lines := strings.Split(strings.TrimSpace(string(f)), "\n")

	part1(lines)

}
