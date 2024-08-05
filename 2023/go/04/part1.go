//go:build ignore

package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
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
		line := scanner.Text()
		parts := strings.Split(line, ":")
		parts[1] = strings.TrimSpace(parts[1])
		parts = strings.Split(parts[1], "|")
		winning := strings.Split(parts[0], " ")
		nums := strings.Split(parts[1], " ")
		lineVal := 0
		for _, win := range winning {
			for _, num := range nums {
				if num == "" || win == "" {
					continue
				}
				if num == win {
					// fmt.Printf("Line: %v Matches: %v\n", line, num)
					if lineVal == 0 {
						lineVal = 1
					} else {
						lineVal = lineVal * 2
					}
				}
			}
		}
		// fmt.Println(lineVal)
		sum += lineVal
	}
	fmt.Println(sum)
}
