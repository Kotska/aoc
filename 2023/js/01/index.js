const fs = require("node:fs");

function hasNumber(str) {
	return /[0-9]/.test(str);
}

fs.readFile("input.txt", "utf8", (err, data) => {
	// Part 1
	if (err) {
		console.error(err);
		return;
	}
	let total = 0;
	data.split("\r\n").forEach(function (el, index) {
		if (!hasNumber(el)) return;

		el = el.replace(/[^0-9]/g, "");
		number = el.charAt(0) + el.charAt(el.length - 1);
		total += parseInt(number);
	});
	console.log("Part 1: " + total);

	// Part 2
	let numbers = {
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
	};

	let total2 = 0;
	function getAllIndexes(arr, val) {
		var indexes = [],
			i = -1;
		while ((i = arr.indexOf(val, i + 1)) != -1) {
			indexes[i] = val;
		}
		return indexes;
	}

	function convertToNumbers(array) {
		array.forEach(function (e, i) {
			for (const [y, x] of Object.entries(numbers)) {
				if (e === y) {
					array[i] = x;
				}
			}
		});
		return array;
	}

	data.split("\r\n").forEach(function (el, index) {
		let num1, num2;
		let found = [];
		for (const [key, value] of Object.entries(numbers)) {
			let s = getAllIndexes(el, key);
			s = convertToNumbers(s);
			s.forEach(function (x, i) {
				found[i] = x;
			});
		}
		found = found.filter((n) => n);
		total2 += parseInt(`${found[0]}${found[found.length - 1]}`);
	});
	console.log("Part 2: " + total2);
});
