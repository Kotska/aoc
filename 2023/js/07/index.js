const fs = require('node:fs');

let cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const dayOne = function(){
    let total = 0;
    fs.readFile('./input.txt', 'utf8', (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        function checkHand(hand){
            let rank = 1;
            let matches = {}
            hand.split('').forEach(char => {
                matches[char] = matches[char] ? matches[char]+1 : 1;
            })
            let l = Object.keys(matches).length;
            if(l === 1){
                rank = 7;
            } else {
                let three = false;
                let two = false;
                for(let key in matches){
                    if(matches[key] === 4){
                        rank = 6;
                        break;
                    }

                    if(matches[key] === 3){
                        three = true;
                    }
                    if(matches[key] === 2){
                        if(two){
                            rank = 3;
                            break;
                        }
                        two = true;
                    }
                    
                    if(three && two){
                        rank = 5;
                        break;
                    } else if (three){
                        rank = 4;
                    } else if(two){
                        rank = 2;
                    }
                }
            }
            return rank;
        }
        function compare(num1, num2){
            for(let x = 0;x<num1.length;x++){
                let index = cards.indexOf(num1.charAt(x));
                let index2 = cards.indexOf(num2.charAt(x));
                if(index == index2) continue;
                return index < index2;
            };
        }
        let ordered = {7: [], 6: [], 5: [], 4: [], 3: [], 2: [], 1: []};
        let ranked = {7: [], 6: [], 5: [], 4: [], 3: [], 2: [], 1: []};
        data.split('\n').filter(x => x != '').forEach(function(line,index){
            let hand = line.match(/([^\s]+)/g)[0];
            let bet = line.match(/([^\s]+)/g)[1];
            let rank = checkHand(hand);
            ordered[rank].push([hand, bet]);
        })
        let l = Object.keys(ordered).length;
        // Loop through the ordered cards and push them in the ranked already ordered
        for(l;l>=1;l--){
            ordered[l].forEach(array => {
                // console.log(array)
                if(ranked[l].length){
                    for(let x = 0;x<ranked[l].length;x++){
                        let bigger = compare(array[0], ranked[l][x][0]);
                        // console.log(`Num1: ${array[0]}, Num2: ${ranked[l][x][0]}`);                                    
                        // console.log(bigger);
                        // console.log(x)

                        if(bigger){
                            ranked[l].splice(x, 0, array);
                            break;
                        } else if(x==ranked[l].length-1){
                            ranked[l].push(array);
                            break;
                        }
                    }
                } else {
                    ranked[l].push(array)
                }
            })
        }
        let res = [...ranked[7],...ranked[6],...ranked[5],...ranked[4],...ranked[3],...ranked[2],...ranked[1]].reverse()
        res.forEach((e,i) => {
            total += e[1] * (i+1)
        })
        console.log(total);
    })
}
let partOneAnswer = dayOne();

function partTwo(){
    let total = 0;
    fs.readFile('./input.txt', 'utf8', (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        function compare(num1, num2){
            let cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
            for(let x = 0;x<num1.length;x++){
                let index = cards.indexOf(num1.charAt(x));
                let index2 = cards.indexOf(num2.charAt(x));
                if(index == index2) continue;
                return index < index2;
            };
        }
        function checkHand(hand){
            let count = (hand.match(/J/g) || []).length;
            let rank = 1;
            if(hand.indexOf('J') !== -1) rank = 2;
            let matches = {}
            hand.split('').forEach(char => {
                matches[char] = matches[char] ? matches[char]+1 : 1;
            })
            let l = Object.keys(matches).length;
            if(l === 1){
                rank = 7;
            } else {
                let three = false;
                let two = false;
                for(let key in matches){
                    if(matches[key] === 4){
                        rank = 6;
                        if(count === 4) rank = 7;
                        if(count === 1) rank = 7;
                        break;
                    }

                    if(matches[key] === 3){
                        three = true;
                    }
                    if(matches[key] === 2){
                        if(two){
                            rank = 3;
                            if(count === 2) rank = 6;
                            if(count === 1) rank = 5;
                            break;
                        }
                        two = true;
                    }

                    if(three && two){
                        rank = 5;
                        if(count === 2 || count === 3) rank = 7;
                        if(count === 1) rank = 6;
                        break;
                    } else if (three){
                        rank = 4;
                        if(count === 3) rank = 6;
                        if(count === 2) rank = 7;
                        if(count === 1) rank = 6;
                    } else if(two){
                        rank = 2;
                        if(count == 2) rank = 4;
                        if(count == 1) rank = 4;
                    }
                }
            }
            return rank;
        }
        let ordered = {7: [], 6: [], 5: [], 4: [], 3: [], 2: [], 1: []};
        let ranked = {7: [], 6: [], 5: [], 4: [], 3: [], 2: [], 1: []};
        data.split('\n').filter(x => x != '').forEach(function(line,index){
            let hand = line.match(/([^\s]+)/g)[0];
            let bet = line.match(/([^\s]+)/g)[1];
            let rank = checkHand(hand);
            if(rank === 4 && hand.includes('J')){
                // console.log(`For ${hand} rank: ${rank}`);
            }
            ordered[rank].push([hand, bet]);
        })
        let l = Object.keys(ordered).length;
        // Loop through the ordered cards and push them in the ranked already ordered
        for(l;l>=1;l--){
            ordered[l].forEach(array => {
                // console.log(array)
                if(ranked[l].length){
                    for(let x = 0;x<ranked[l].length;x++){
                        let bigger = compare(array[0], ranked[l][x][0]);
                        // console.log(`Num1: ${array[0]}, Num2: ${ranked[l][x][0]}`);                                    
                        // console.log(bigger);
                        // console.log(x)

                        if(bigger){
                            ranked[l].splice(x, 0, array);
                            break;
                        } else if(x==ranked[l].length-1){
                            ranked[l].push(array);
                            break;
                        }
                    }
                } else {
                    ranked[l].push(array)
                }
            })
        }
        let res = [...ranked[7],...ranked[6],...ranked[5],...ranked[4],...ranked[3],...ranked[2],...ranked[1]].reverse()
        res.forEach((e,i) => {
            total += e[1] * (i+1)
        })
        console.log(total);
    })
}

let partTwoAnswer = partTwo();
