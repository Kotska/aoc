//go:build ignore

package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	sum := 0
	for scanner.Scan() {
		var lines string = scanner.Text()
		sum += checkLine(lines[7:])
	}
	fmt.Println(sum)
}

func checkLine(line string) int {
	sum := 1
	buff := ""
	num := 0
	max := map[string]int{
		"r": 0,
		"g": 0,
		"b": 0,
	}

	for i, r := range line {
		if i == 0 {
			continue
		}

		char := string(rune(r))
		prev := string(rune(line[i-1]))
		_, err := strconv.Atoi(char)

		if err == nil {
			buff += char
		}

		for c, v := range max {
			if char == c && prev == " " {
				num, _ = strconv.Atoi(buff)
				if v < num {
					max[c] = num
				}
				buff = ""
			}
		}

	}

	for _, i := range max {
		sum *= i
	}

	// fmt.Printf("Line: %v, Max: %v, Sum: %v\n", line, max, sum)
	return sum
}
