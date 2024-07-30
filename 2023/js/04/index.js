const fs = require("node:fs");

fs.readFile("input.txt", "utf8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let total1 = 0;
	let total2 = 0;
	let data2 = {};
	data.split("\n").forEach(function (e, i) {
		// if(i !== 0) return true;
		let points = 0;
		let ID = parseInt(e.match(/[0-9]*(?=:)/g)[0]);
		let winning = e
			.match(/:(.*)\|/)[1]
			.split(" ")
			.filter((x) => x !== "");
		let numbers = e
			.match(/\|(.*)/)[1]
			.split(" ")
			.filter((x) => x !== "");

		winning.forEach(function (num) {
			if (numbers.indexOf(num) !== -1) {
				if (points === 0) {
					points = 1;
				} else {
					points = points * 2;
				}
			}
		});

		total1 += points;

		data2[ID] = {
			winning: winning,
			numbers: numbers,
			remaining: 1,
		};
	});

	function countWinning() {
    for (const e in data2) {
      // if(e != 2) continue;
      let winning = 0;
      let tmp = parseInt(e);
      
			data2[e].winning.forEach(function (num) {
        if (data2[e].numbers.indexOf(num) !== -1) {
          tmp += 1;
          if(tmp > Object.keys(data2).length) return;
          data2[tmp].remaining += data2[e].remaining;
          winning += 1;
				}
        // console.log(data2[tmp]);
			});
      total2 += data2[e].remaining;
      // console.log(`Winning: ${winning} Total: ${data2[e].remaining}`);
		}

	}
	countWinning();
  console.log(total2);

	// console.log(total1);
});
