const fs = require("node:fs");
const { log } = require("node:util");

function findIndex(arr, needle) {
  for (var i = 0; i < arr.length; i++) {
    for (var i2 = 0; i2 < arr[i].length; i2++) {
      var index = arr[i][i2].indexOf(needle);
      if (index > -1) {
        return [i, i2];
      }
    }
  }
  return false;
}

fs.readFile("./test2.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  let map = [];
  data.split('\n').filter(x => x != '').forEach(function (line, index) {
    let tmp = [];
    let chars = line.split('');
    chars.forEach(x => {
      tmp.push(x);
    });
    map.push(tmp);
  });

  let startIndex = findIndex(map, 'S');
  let stack = [startIndex];
  let visited = [startIndex];
  let finish = false;
  //               right;    down;    left;    up;
  let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let pipes = ['-7J', '|LJ', '-FL', '|F7'];
  console.table(map);
  let index = 0;
  while (!finish && index < 10) {
    index++;
    let current = stack.pop(-1);
    console.log(current)
    directions.forEach((dir, i) => {
      let next = [current[0] + dir[0], current[1] + dir[1]];
      if (next[0] > -1 && next[0] <= map.length - 1 && next[1] > -1 && next[1] <= map[0].length - 1) {
        if (pipes[i].includes(map[next[0]][next[1]]) && !visited.some((v, i) => v.toString() == next.toString())) {
          stack.push(next);
        } else if (map[next[0][next[1]]] === 'S') {
          finish = true;
        }
        visited.push(next);
      }
      if (next == startIndex) finish = true;
    });
  }

})

