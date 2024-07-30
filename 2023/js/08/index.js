const fs = require("node:fs");
const { log } = require("node:util");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  let instructions = '';
  let nodes = {};
  data.split('\n').filter(x => x != '').forEach(function (line, index) {
    if (index == 0) {
      instructions = line;
    } else {
      let current = line.slice(0, 3);
      let l = line.slice(7, 10);
      let r = line.slice(12, 15);
      nodes[current] = [l, r];
      // console.log(`Line: "${line}" Left: "${l}" Right: "${r}"`);
    }
  });

  function partOne() {
    let count = 0;
    let current = 'AAA';
    while (current !== 'ZZZ') {
      [...instructions].forEach(c => {
        count++;
        let side = 0;
        if (c === 'R') side = 1;
        current = nodes[current][side];
        if (current === 'ZZZ') return false;
      });
    }
    return count;
  }

  const gcd = (a, b) => a ? gcd(b % a, a) : b;

  const lcm = (a, b) => a * b / gcd(a, b);

  function partTwo() {
    let count = 0;
    let current = [];
    let totalMatch = 0;
    let periods = [];
    let tmp = [];
    Object.keys(nodes).forEach(x => {
      if (x.charAt(2) === 'A') {
        current.push(x);
      }
    });
    for (let i = 0; i < current.length; i++) {
      tmp = [];
      count = 0;
      let found = false;
      while (found === false) {
        [...instructions].forEach(c => {
          count++;
          let side = 0;
          if (c === 'R') side = 1;
          current[i] = nodes[current[i]][side];
          if (current[i].charAt(2) === 'Z') {
            found = true;
            tmp.push(count);
          };
        });
      }
      periods.push(tmp);
    }
    return periods.reduce(lcm);
  }

  // let answer1 = partOne();
  let answer2 = partTwo();
  console.log(answer2);


});
