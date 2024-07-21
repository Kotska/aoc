const fs = require("node:fs");
const { log } = require("node:util");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  function substractArray(arr) {
    let tmp = [];
    let curr = arr.at(-1);
    for (i = 1; i < curr.length; i++) {
      tmp.push(curr[i] - curr[i - 1]);
    }
    arr.push(tmp);
    if (!tmp.every(x => x === 0)) {
      arr = substractArray(arr);
    }
    return arr;
  }

  let oasis = [];
  data.split('\n').filter(x => x != '').forEach(function (line, index) {
    let tmp = line.split(/\s+/).map(Number);
    oasis.push([tmp]);
  });
  oasis.forEach((x, i) => {
    let curr = x.at(-1);
    let tmp = substractArray([curr]);
    // console.log(tmp)
    oasis[i] = tmp;
    // console.dir(oasis[i], { depth: null });
    return false;
  });
  let total = 0;
  oasis.forEach(x => {
    x.forEach(y => {
      total += y.at(-1)
    })
  })

  // Part 1
  console.log(`Part 1: ${total}`);


  total = 0;
  oasis.forEach((x, i) => {
    let tmp = 0;
    x.reverse().forEach((y, i2) => {
      tmp = y[0] + (-tmp);
      // console.log(x[i].reverse())
    })
    total += tmp;
  });

  // Part 2
  console.log(`Part 2: ${total}`);

});
