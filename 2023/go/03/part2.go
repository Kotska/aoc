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

	var lines []string
	var buff string
	var included = false
	var c [2]int
	var sum int
	gears := make(map[[2]int][]int)
	directionsToCheck := [8][2]int{
		{-1, 0},  // top
		{-1, 1},  // top-right
		{0, 1},   // right
		{1, 1},   // bottom-right
		{1, 0},   // bottom
		{1, -1},  // bottom-left
		{0, -1},  // left
		{-1, -1}, // top-left
	}

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	for i, line := range lines {
		for i2, r := range line {
			char := string(rune(r))

			if r <= '9' && r >= '0' {
				buff += char
				if included == false {
					adjacent, coord := checkAdjacent(lines, i, i2, directionsToCheck)
					if adjacent {
						included = true
						c = coord
					}
				}
			}

			if r > '9' || r < '0' || i2 == len(line)-1 {
				if included == false {
					buff = ""
				} else {
					num, _ := strconv.Atoi(buff)
					gears[c] = append(gears[c], num)
					buff = ""
					included = false
				}
			}
		}
	}

	for _, v := range gears {
		if len(v) == 2 {
			sum += v[0] * v[1]
		}
	}

	fmt.Println(sum)
}

func checkAdjacent(lines []string, i int, i2 int, directionsToCheck [8][2]int) (bool, [2]int) {
	for _, dir := range directionsToCheck {
		x := i + dir[0]
		y := i2 + dir[1]
		if x >= 0 && x < len(lines) && y >= 0 && y < len(lines[x]) {
			r := lines[x][y]
			char := string(rune(r))
			if (r > '9' || r < '0') && char != "." {
				return true, [2]int{x, y}
			}
		}
	}
	return false, [2]int{}
}
