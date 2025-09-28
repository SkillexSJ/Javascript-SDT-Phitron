var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];
let ans = "";

for (let i = 0; i < friends.length; i++) {
  if (friends[i].length > ans.length) {
    ans = friends[i];
  }
}
console.log("The biggest name is: " + ans);
