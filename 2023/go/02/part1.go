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
	i := 1
	sum := 0
	max := map[string]int{
		"red":   12,
		"green": 13,
		"blue":  14,
	}
	for scanner.Scan() {
		var lines string = scanner.Text()
		if checkLine(lines, max) {
			sum += i
		}
		i++
	}
	fmt.Println(sum)
}

func checkLine(line string, max map[string]int) bool {
	parts := strings.Split(line, ":")
	parts = strings.Split(parts[1], ";")
	for _, w := range parts {
		for _, s := range strings.Split(w, ",") {
			for color, m := range max {
				if strings.Contains(s, color) {
					re := regexp.MustCompile(`\d+`)
					number, err := strconv.Atoi(re.FindString(s))
					if err == nil && number > m {
						return false
					}
				}
			}
		}
	}
	return true
}
