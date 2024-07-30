const fs = require("node:fs");

fs.readFile("test.txt", "utf8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let seeds = data
		.match(/:(.*)/)[1]
		.split(" ")
		.filter((x) => x != "");
	let flag = false;
	let from = "";
	let to = "";
	let results = {};
	data.split("\n").forEach(function (line, i) {
		if (line.indexOf("map") !== -1) {
			from = line.split("-")[0];
			to = line.split("-")[2].split(" ")[0];
			flag = true;
			results[to] = {};
			return true;
		}

		if (!line.match(/\d/g)) {
			flag = false;
			if (to) {
				seeds = Object.values(results[to]);
			}
		}

		if (flag) {
			let number = line.split(/ |\r/).filter((x) => x != "" && x != "\r");

			seeds.forEach(function (n, index) {
				n = parseInt(n);
				number[0] = parseInt(number[0]);
				number[1] = parseInt(number[1]);
				number[2] = parseInt(number[2]);

				if (number[1] <= n && n <= number[1] + number[2]) {
					results[to][n] = number[0] - number[1] + n;
					return;
				}

				if (results[to][n] === undefined) results[to][n] = n;
			});
		}
	});

	// console.log(Object.values(results['location']));
	// console.log(Math.min(...Object.values(results['location'])));
	// console.log(...results['location'].filter(x => x));

	flag = false;
	from = "";
	to = "";
	results = [];
	let subRanges = [];
	let seedsVector = [];
	let seeds2 = data
		.match(/:(.*)/)[1]
		.split(" ")
		.filter((x) => x != "");

	for (let i = 0; i < seeds2.length; i += 2) {
		let start = parseInt(seeds2[i]);
		let length = parseInt(seeds2[i + 1]);
		let end = start + length - 1;
		seedsVector.push([start, end]);
	}
	let newRange = [];
	data.split("\n").forEach(function (line, i) {
		if (line.indexOf("map") !== -1) {
			from = line.split("-")[0];
			to = line.split("-")[2].split(" ")[0];
			flag = true;
			return true;
		}

		if (!line.match(/\d/g)) {
			flag = false;
			if(to){
				seedsVector = [...seedsVector, ...newRange];
				newRange = [];
			}
		}

		if (flag) {
			let number = line.split(/ |\r/).filter((x) => x != "" && x != "\r");

			let remaining = [];
			// console.log(seedsVector);
			// console.log(seedsVector);
			// console.log(number);
			// console.log('-----------');
			seedsVector.forEach(function(seed, x){
				// console.log(seed);
				let numOffset = parseInt(number[0]);
				let numStart = parseInt(number[1]);
				let numLength = parseInt(number[2]);
				let numEnd = numStart + numLength - 1;
				let offset = numOffset - numStart;
				subRanges = [];
				

				if (seed[0] > numEnd || numStart > seed[1]) {
					remaining.push([...seed]);
				} else {
					let min = Math.max(seed[0], numStart);
					let max = Math.min(seed[1], numEnd);
					let e = min + offset;
					let f = max + offset;
					if(e <= 1) return true;

					if(min == seed[0] && max == seed[1]){
						subRanges.push([e, f]);
					} else if (min == seed[0] && max == numEnd) {
						subRanges.push([e, f]);
						remaining.push([max+1, seed[1]]);
					} else {
						subRanges.push([e, f]);
						remaining.push([seed[0], numStart-1]);
					}

					// console.log(remaining);
				}
				// console.log(subRanges);
				if(subRanges.length) newRange.push(...subRanges);
				// if(seed[0] == 57 && numStart == 53) {
				// 	console.log(remaining);
				// }
			});
			seedsVector = [...remaining];

		}
	});
	console.log(seedsVector);
	// console.log(Math.min(...seedsVector.flat()));
});
