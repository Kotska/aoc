const fs = require("node:fs");

fs.readFile("input.txt", "utf8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

  console.time('Runtime');
	let seeds = data
		.match(/:(.*)/)[1]
		.split(" ")
		.filter(x => x != "")
    .map(x => parseInt(x));
	let almanac = [];
  let idx = -1;
	data.split("\n").forEach(function (line) {
		if (line.indexOf("map") !== -1) {
      idx += 1;
      almanac[idx] = {from: [], to: []}
		} else if (line.indexOf('seeds') == -1 && line != '' && line != '\r'){
			let values = line.split(/ |\r/).filter((x) => x != "" && x != "\r");
      let numOffset = parseInt(values[0]);
      let numStart = parseInt(values[1]);
      let numLength = parseInt(values[2]);
      almanac[idx].from.push({from: numStart, to: numStart + numLength - 1});
      almanac[idx].to.push({from: numOffset, to: numOffset + numLength - 1});
    }
	});
  for(const key in almanac){
    let map = almanac[key];
    seeds.forEach(function(seed, id){
      let fromOffset, fromIdx;
      for(const key2 in map.from){
        let val = map.from[key2];
        if(val.from <= seed && seed <= val.to){
          fromOffset = seed - val.from;
          fromIdx = key2;
          break;
        }
      }

      if(fromOffset == undefined || fromIdx == undefined) return true;

      seeds[id] = parseInt(map.to[fromIdx].from) + fromOffset;
    })
  }

  console.log(Math.min(...seeds));
  console.timeEnd('Runtime');

});
