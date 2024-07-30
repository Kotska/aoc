const fs = require("node:fs");

fs.readFile("input.txt", "utf8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	// console.log(data);

	let lineLength = data.split("\n")[0].length + 1;
	let dataArray = [];
	let dataArray2 = [];
	let total1 = 0;
	let total2 = 0;

	for (let i = 0; i < data.length; i++) {
		if (/\d/.test(data.charAt(i))) {
			dataArray[i] = 1;
			continue;
		}

		if (/[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/.test(data.charAt(i))) {
			dataArray[i] = 2;
			continue;
		}

		dataArray[i] = 0;
	}

	for (let i = 0; i < data.length; i++) {
		if (/\d/.test(data.charAt(i))) {
			dataArray2[i] = 1;
			continue;
		}

		if(data.charAt(i) == '*') {
			dataArray2[i] = 2;
			continue;
		}

		dataArray2[i] = 0;
	}

	let flag = false;
	let tmpNum = "";
	let pos = [
		-1,
		1,
		lineLength,
		lineLength - 1,
		lineLength + 1,
		-lineLength,
		-lineLength - 1,
		-lineLength + 1,
	];
	dataArray.forEach(function (e, i) {
		// if(i > 20) return true;
		if (e === 0 || e === 2) {
			flag = false;
			tmpNum = "";
		}

		if (e === 1) {
			tmpNum = tmpNum + data[i];

			// Check conditions
			pos.forEach(function (offset) {
				if (dataArray[i + offset] === 2) {
					flag = true;
				}
			});
		}

		if (
			(flag && dataArray[i + 1] !== 1) ||
			(flag && e === 1 && i === dataArray.length)
		) {
			total1 += parseInt(tmpNum);
			// console.log(`Total increased by ${tmpNum} for: ${total1}`);
		}

		// console.log(data[i]);
		// console.log(flag);
	});

	dataArray2.forEach(function(e,i){

		if(data.charAt(i) == '*'){
			let matches = 0;
			let tmpDataArray = dataArray2;
			tmpNum = '';
			let tmpNum2 = '';
			pos.forEach(function (offset) {
				flag = false;
				let flag2 = true;
				let y = i + offset;
				if (tmpDataArray[y] === 1) {
					matches += 1;
					console.log('----------');
					console.log(data[y]);
					console.log('-');
					
					while(flag2){
						y = y - 1;
						if(tmpDataArray[y] !== 1){
							flag2 = false;
							flag = true;
							y = y + 1;
						}
						while(flag){
							if(matches === 1) {
								tmpNum = tmpNum + data[y];
								// console.log(data[y]);
							}
							if(matches === 2){
								tmpNum2 = tmpNum2 + data[y];
								// console.log(data[y]);
							}

							tmpDataArray[y] = 0;
							y += 1;
							if(tmpDataArray[y] !== 1){
								flag = false;
							}
						}
					}

				}
				
			});
			if(matches === 2){
				total2 += parseInt(tmpNum) * parseInt(tmpNum2);
			}

		}
	});

	console.log(total2);
});
