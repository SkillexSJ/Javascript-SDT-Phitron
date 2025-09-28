var numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];
var unique = [];
for (var i = 0; i < numbers.length; i++) {
  if (unique.indexOf(numbers[i]) === -1) {
    unique.push(numbers[i]);
  }
}
console.log(unique);

let max = numbers[0];
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}
console.log("The biggest number is: " + max);
