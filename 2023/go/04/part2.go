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
	stack := []int{}
	index := 0
	sum := 0
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, ":")
		parts[1] = strings.TrimSpace(parts[1])
		parts = strings.Split(parts[1], "|")
		winning := strings.Split(parts[0], " ")
		nums := strings.Split(parts[1], " ")
		lineVal := 0
		stack = addToStack(stack, index, 1)
		for _, win := range winning {
			for _, num := range nums {
				if num == "" || win == "" {
					continue
				}
				if num == win {
					lineVal++
				}
			}
		}
		// fmt.Printf("before stack: %v lineVal for %v: %v ", stack, index, lineVal)
		for i := 1; i < lineVal+1; i++ {
			stack = addToStack(stack, index+i, stack[index])
		}
		// fmt.Printf("New stack: %v\n", stack)
		sum += stack[index]
		index++
	}
	fmt.Println(sum)
}

func addToStack(stack []int, index int, num int) []int {
	if len(stack) > index {
		stack[index] += num
	} else {
		stack = append(stack, num)
	}
	return stack
}
