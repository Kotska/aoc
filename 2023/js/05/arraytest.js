let array = [0, 1, 2];
array.forEach(function(e,i){
  if(e > 15){
    return false;
  }
  array.push(Math.max(...array)+1);
});
// [ 0, 1, 2, 3, 4, 5 ]

array.forEach(function(e,i){
  array=[];
  console.log(e);
});

array = [0, 1, 2];
for (let x = 0; x < array.length; x += 1) {
  if(array[x] > 15){
    return false;
  }
  array.push(Math.max(...array)+1);
}
// [ 0,  1,  2,  3,  4,  5,  6, 7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ]