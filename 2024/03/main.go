package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func part1(s string) int {
	re := regexp.MustCompile(`mul\((\d+),(\d+)\)`)
	matches := re.FindAllStringSubmatch(s, -1)
	sum := 0
	for _, match := range matches {
		fmt.Println(match[0])
		x, _ := strconv.Atoi(match[1])
		y, _ := strconv.Atoi(match[2])
		sum += x * y
	}
	return sum
}

func part2(s string) int {
	sum := 0
	enabled := true
	reCmd := regexp.MustCompile(`(do|don't)\(\)|mul\((\d+),(\d+)\)`)

	matches := reCmd.FindAllStringSubmatch(s, -1)
	for _, match := range matches {
		if match[1] == "do" {
			enabled = true
		} else if match[1] == "don't" {
			enabled = false
		} else if enabled && match[2] != "" { // mul operation
			x, _ := strconv.Atoi(match[2])
			y, _ := strconv.Atoi(match[3])
			sum += x * y
		}
	}
	return sum
}

func main() {
	f, _ := os.ReadFile("input.txt")
	s := string(f)

	// p1 := part1(s)
	// fmt.Println("part1:", part1(s))

	p2 := part2(s)
	fmt.Println("part2:", p2)
}
