const fs = require("node:fs");

fs.readFile("test.txt", "utf8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let races = [];
	data.split("\n").forEach(function (line, index) {
		let numbers = line.match(/\d(?:[,\d]*\.\d+|[,\d]*)/g);
		if (index === 0) {
			numbers.forEach(function (num) {
				races.push({ time: parseInt(num) });
			});
		}

		if (index === 1) {
      numbers.forEach(function (num, i) {
        races[i].distance = parseInt(num);
			});
		}
	});

  let results = [];
  races.forEach(function(race){
    let counter = 0;
    for(x = 0;x < race.time;x++){
      let total = (race.time - x) * x;
      if(total > race.distance) counter++;
    }
    results.push(counter);
  });
  let res1 = results.reduce((a,b) => a * b);
  

  let time = '';
  let distance = '';
  let counter = 0;
	data.split("\n").forEach(function (line, index) {
		let numbers = line.match(/\d(?:[,\d]*\.\d+|[,\d]*)/g);
		if (index === 0) {
			numbers.forEach(function (num) {
        time = time + num;
			});
		}

		if (index === 1) {
      numbers.forEach(function (num) {
        distance = distance + num;
			});
		}

	});

  console.log(time);
  console.log(distance);
  for(x = 0;x < time;x++){
    let total = (time - x) * x;
    if(total > distance) {
      console.log(Math.floor(((time - x) + x)));
      break;
    };
  }
  // console.log(counter);
});
