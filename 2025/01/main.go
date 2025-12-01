package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func extractMoves(path string) []string {
	f, _ := os.ReadFile(path)
	s := string(f)
	s = strings.TrimSpace(s)
	return strings.Split(s, "\n")
}

func getDirectionalSteps(steps string) int {
	nbrSteps, _ := strconv.Atoi(steps[1:])
	if steps[0] == 'L' {
		return -nbrSteps
	}
	return nbrSteps
}

func problem1(dialPos int, steps string) int {
	direction := steps[0]
	nbrSteps, _ := strconv.Atoi(steps[1:])

	switch direction {
	case 'L':
		dialPos -= nbrSteps
	case 'R':
		dialPos += nbrSteps
	}

	if dialPos < 0 {
		dialPos += 100
	}

	if dialPos >= 100 {
		dialPos -= 100
	}

	dialPos %= 100
	return dialPos
}

func problem2(dialPos int, steps string) (int, int) {
	ds := getDirectionalSteps(steps)

	// count number of rotations/passes - neat trick, go doesn't have Abs for int, but max(x, -x) does the same
	passes := max(ds, -ds) / 100

	// if we don't use the remainder we'll miss passes
	remainder := ds % 100
	target := dialPos + remainder
	finalPos := ((target % 100) + 100) % 100 // go modulo can return negatives, do a double to ensure positive

	// check if remainder movement crosses 0
	sum := dialPos + remainder
	if sum >= 100 || (sum <= 0 && remainder < 0 && dialPos > 0) {
		passes++
	}
	return finalPos, passes
}

func main() {
	dialPos := 50
	passes := 0
	pw := 0

	moves := extractMoves("./01/input.txt")
	for _, move := range moves {
		if problem1(dialPos, move) == 0 {
			pw++
		}
		var p int
		dialPos, p = problem2(dialPos, move)
		passes += p
	}

	fmt.Println("Problem 1:", pw)
	fmt.Println("Problem 2:", passes)
}
