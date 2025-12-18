package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func readFile(path string) ([]string, error) {
	f, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	s := strings.TrimSpace(string(f))
	return strings.Split(s, ","), nil
}

func makeRange(s1, s2 string) []string {
	v1, _ := strconv.Atoi(s1)
	v2, _ := strconv.Atoi(s2)

	vals := make([]string, v2-v1+1)
	for i := 0; i <= v2-v1; i++ {
		vals[i] = strconv.Itoa(v1 + i)
	}
	return vals
}

func part1(s string) int {
	if s[0] == '0' || len(s)%2 != 0 {
		return 0
	}

	half := len(s) / 2
	if s[0:half] != s[half:] {
		return 0
	}

	v, _ := strconv.Atoi(s)
	return v
}

func main() {
	s, err := readFile("./02/input.txt")
	if err != nil {
		log.Fatal(err)
	}

	sum := 0
	for _, r := range s {
		spl := strings.Split(r, "-")
		vals := makeRange(spl[0], spl[1])
		for _, v := range vals {
			res := part1(v)
			// fmt.Printf("%v: %v\n", v, res)
			sum += res
		}
	}

	fmt.Printf("\nresult sum: %v\n", sum)

}
