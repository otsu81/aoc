package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func calcAbs(i int) int {
	if i < 0 {
		return -i
	}
	return i
}

func extractTwoArrays(path string) ([]int, []int) {
	f, _ := os.ReadFile(path)
	s := string(f)
	var a1, a2 []int
	for _, line := range strings.Split(s, "\n") {
		if line == "" {
			continue
		}
		vals := strings.Split(line, "   ")
		i, _ := strconv.Atoi(vals[0])
		j, _ := strconv.Atoi(vals[1])
		a1 = append(a1, i)
		a2 = append(a2, j)
	}
	return a1, a2
}

func problem1(a1, a2 []int) {
	sort.Ints(a1)
	sort.Ints(a2)

	sum := 0
	for i, j := range a1 {
		distance := calcAbs(j - a2[i])
		sum += distance
	}

	fmt.Println("problem 1:", sum)
}

func problem2(a1, a2 []int) {
	m1, m2 := make(map[int]int), make(map[int]int)
	for _, i := range a1 {
		m1[i]++
	}
	for _, i := range a2 {
		m2[i]++
	}

	sum := 0
	for _, v := range a1 {
		if m2[v] > 0 {
			product := v * m2[v]
			sum += product
		}
	}
	fmt.Println("problem 2:", sum)
}

func main() {
	a1, a2 := extractTwoArrays("./input.txt")
	problem1(a1, a2)
	problem2(a1, a2)
}
