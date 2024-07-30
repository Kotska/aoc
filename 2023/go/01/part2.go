//go:build ignore

package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	numbers := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	sum := 0

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var lines string = scanner.Text()

		first := findFirst(lines, numbers)
		second := findSecond(lines, numbers)

		totalS := strconv.Itoa(first) + strconv.Itoa(second)
		totalI, _ := strconv.Atoi(totalS)
		sum += totalI
	}
	fmt.Println(sum)
}

func findFirst(lines string, numbers []string) int {
	t := ""
	for _, v := range lines {
		if n, err := strconv.Atoi(string(rune(v))); err == nil {
			return n
		} else {
			t += string(rune(v))
			for i, s := range numbers {
				if strings.Contains(t, s) {
					return i + 1
				}
			}
		}
	}
	return 0
}

func findSecond(lines string, numbers []string) int {
	t := ""
	for j := len(lines) - 1; j >= 0; j-- {
		if n, err := strconv.Atoi(string(rune(lines[j]))); err == nil {
			return n
		} else {
			t = string(rune(lines[j])) + t
			for i, s := range numbers {
				if strings.Contains(t, s) {
					return i + 1
				}
			}
		}
	}
	return 0
}
