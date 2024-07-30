const fs = require("node:fs");
fs.readFile("input.txt", "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	function getColors(colors) {
		let res = [];
		colors.forEach(function (e, i) {
			e = e.split(",");
			let matched = splitColors(e);
			res.push(matched);
		});
		return res;
	}

	function splitColors(colors) {
		let matched = [];
		colors.forEach(function (e, i) {
			matched[e.match(/[a-z]+/g)[0]] = parseInt(e.match(/\d+/g)[0]);
		});
		return matched;
	}

	function isGamePossible(colors) {
		let possible = true;
		colors.forEach(function (single) {
			for (const color in single) {
				if (color === "red") {
					if (single[color] > 12) {
						possible = false;
						return true;
					}
				}

				if (color === "green") {
					if (single[color] > 13) {
						possible = false;
						return true;
					}
				}

				if (color === "blue") {
					if (single[color] > 14) {
						possible = false;
						return true;
					}
				}
			}
		});
		return possible;
	}

	function getMinColors(colors) {
		let minColors = { red: 0, green: 0, blue: 0 };
		colors.forEach(function (single) {
      for (const color in single) {
        if(minColors[color] < single[color]){
          minColors[color] = single[color];
        }
      }
		});
    return minColors;
	}

	data = data.split("\n");
	let total1 = 0;
	let total2 = 0;
	data.forEach(function (e, i) {
		let ID = parseInt(e.match(/[0-9]*(?=:)/g, 1)[0]);
		let colors = e.replace(e.match(/.*(?=:)../g)[0], "").split(";");
		colors = getColors(colors);

		let possible = isGamePossible(colors);
		if (possible) total1 += ID;

		let minColors = getMinColors(colors);
    total2 += minColors.red * minColors.green * minColors.blue;
    
		// console.log(`ID: ${ID}`);
    // console.log(minColors);
		// console.log(e);
		// console.log(colors);
	});
	console.log(`Answer 1: ${total1}`);
	console.log(`Answer 2: ${total2}`);
});
