package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func splitToArrays(path string) [][]int {
	f, _ := os.ReadFile(path)
	s := string(f)
	var a [][]int
	for _, line := range strings.Split(s, "\n") {
		if line == "" {
			continue
		}
		var a1 []int
		for _, val := range strings.Split(line, " ") {
			i, _ := strconv.Atoi(val)
			a1 = append(a1, i)
		}
		a = append(a, a1)
	}
	return a
}

func checkSafe(i1, i2, posOrNeg int) bool {
	v := (i1 - i2) * posOrNeg
	if v == 0 {
		return false
	}
	return 1 <= v && v <= 3
}

func checkLevel(level []int) bool {
	safe := true
	var posOrNeg int
	if level[0] > level[1] {
		posOrNeg = 1
	} else if level[0]-level[1] == 0 {
		return false
	} else {
		posOrNeg = -1
	}

	for i := 1; i < len(level); i++ {
		if !checkSafe(level[i-1], level[i], posOrNeg) {
			safe = false
			break
		}
	}
	return safe
}

func problem2(a [][]int) {
	safesum := 0
	for _, level := range a {
		safe := checkLevel(level)
		if safe {
			safesum++
			continue
		}

		for i := range level {
			sublevel := append([]int{}, level[:i]...)
			sublevel = append(sublevel, level[i+1:]...)
			safe = checkLevel(sublevel)
			if safe {
				safesum++
				break
			}
		}

	}
	fmt.Println("problem 2:", safesum)
}

func problem1(a [][]int) {
	safeSum := 0
	for _, level := range a {
		safe := checkLevel(level)
		if safe {
			safeSum++
		}
	}

	fmt.Println("problem 1:", safeSum)
}

func main() {
	a := splitToArrays("./input.txt")
	problem1(a)
	problem2(a)
}
