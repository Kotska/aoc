package main

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	// First read the input file

	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	sum := 0

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var lines string = scanner.Text()

		first, _ := findFirst(lines)
		second, _ := findSecond(lines)

		totalS := strconv.Itoa(first) + strconv.Itoa(second)
		totalI, _ := strconv.Atoi(totalS)
		sum += totalI
	}
	fmt.Println(sum)
}

func findFirst(lines string) (int, error) {
	for _, v := range lines {
		if n, err := strconv.Atoi(string(rune(v))); err == nil {
			return n, nil
		}
	}
	return 0, errors.New("not found")
}

func findSecond(lines string) (int, error) {
	for i := len(lines) - 1; i >= 0; i-- {
		if n, err := strconv.Atoi(string(rune(lines[i]))); err == nil {
			return n, nil
		}
	}
	return 0, errors.New("not found")
}
