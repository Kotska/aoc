
const fs = require("node:fs");
const { log } = require("node:util");

const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",
  FgGray: "\x1b[90m",
  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
  BgGray: "\x1b[100m",
}

function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

/**
 * Index of Multidimensional Array
 * @param arr {!Array} - the input array
 * @param k {object} - the value to search
 * @return {Array} 
 */
function getIndexOfK(arr, k) {
  let res = [];
  for (var i = 0; i < arr.length; i++) {
    // var index = arr[i].indexOf(k);
    // console.log(index)
    var index = getAllIndexes(arr[i], k);
    if (index.length) {
      index.forEach(x => {
        res.push([i, x]);
      })
    }
  }
  return res;
}

fs.readFile("./test2.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  let map = [];
  data.split('\n').filter(x => x != '').forEach(function (line, index) {
    let chars = line.split('');
    let tmp = [];
    chars.forEach(x => {
      switch (x) {
        case '.':
          tmp.push(-1);
          break;
        case '|':
          tmp.push('NS');
          break;
        case '-':
          tmp.push('EW');
          break;
        case 'L':
          tmp.push('NE');
          break;
        case 'J':
          tmp.push('NW');
          break;
        case 'F':
          tmp.push('SE');
          break;
        case '7':
          tmp.push('SW');
          break;
        case 'S':
          tmp.push(0);
          break;
      }
    });
    map.push(tmp);
  });
  // console.dir(map, { depth: null })
  // console.table(map);
  let start = getIndexOfK(map, 0);
  // console.log(start);
  let index = 0;
  function findingNeighbors(myArray, i, j) {

    if (map[i - 1]) {
      if (typeof map[i - 1][j] === 'string') {
        if (map[i - 1][j].includes('S')) {
          map[i - 1][j] = index + 1;
        }
      }
    }

    if (map[i][j - 1]) {
      if (typeof map[i][j - 1] === 'string') {
        if (map[i][j - 1].includes('E')) {
          map[i][j - 1] = index + 1;
        }
      }
    }

    if (map[i + 1]) {
      if (typeof map[i + 1][j] === 'string') {
        if (map[i + 1][j].includes('N')) {
          map[i + 1][j] = index + 1;
        }
      }
    }

    if (map[i][j + 1]) {
      if (typeof map[i][j + 1] === 'string') {
        if (map[i][j + 1].includes('W')) {
          map[i][j + 1] = index + 1;
        }
      }
    }
  }
  findingNeighbors(map, start[0][0], start[0][1]);
  index++;
  while (getIndexOfK(map, index).length !== 1) {
    getIndexOfK(map, index).forEach(x => {
      findingNeighbors(map, x[0], x[1]);
    })
    // console.table(map)
    index++;
    // console.log(index)
    // console.log(getIndexOfK(map, index))
  }
  console.table(map)

  // Part 1
  // console.log(index);


  data.split('\n').filter(x => x != '').forEach(function (line, index) {
    let chars = line.split('');
    chars.forEach((y, i) => {
      if (map[index][i] > -1) {
        process.stdout.write(`${colors.FgYellow}`);
      }
      process.stdout.write(`${y}`);
      process.stdout.write(`${colors.Reset}`);
    })
    process.stdout.write('\n');
  })
})
