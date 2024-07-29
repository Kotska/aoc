//go:build ignore

package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
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
	max := map[string]int{
		"red":   0,
		"green": 0,
		"blue":  0,
	}
	line = strings.Replace(line, ";", ",", -1)
	parts := strings.Split(line, ",")
	for _, s := range parts {
		for color, m := range max {
			if strings.Contains(s, color) {
				re := regexp.MustCompile(`\d+`)
				number, err := strconv.Atoi(re.FindString(s))
				if err == nil && number > m {
					max[color] = number
				}
			}
		}
	}

	for _, i := range max {
		sum *= i
	}
	return sum
}
