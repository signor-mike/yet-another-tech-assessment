const solutionOne = (arr, num) => {
  const add = (a, b) => a + b;
  return arr.reduce(add, num);
};
console.log(solutionOne([1, 2, 3, 4, 5], 0));

const testArray1 = [
  1,
  2,
  3,
  4,
  "5",
  "foo",
  true,
  { name: "John" },
  ["foo", "bar", "buzz"],
];
const solutionThree = (arr, num) => {
  const newArray = arr.filter((e) => typeof e === "number");
  const badArray = arr.filter((e) => typeof e !== "number");
  if (badArray.length > 0) {
    for (let i = 0; i < badArray.length; i++) {
      if (typeof badArray[i] === "string") {
        if (parseInt(badArray[i]) === parseInt(badArray[i])) {
          newArray.push(parseInt(badArray[i]));
          console.log(
            badArray[i],
            " is not a number, but it is convertable to number, therefore it is added to the final result"
          );
        }
      } else {
        console.log(
          badArray[i],
          ` is ${typeof badArray[
            i
          ]} which is not a number and not conversible to a number!`
        );
      }
    }
  }
  return newArray.reduce((a, b) => a + b, num);
};
console.log(solutionThree(testArray1, 0));

/*
I installed Ramda package (which I never used before) and ran it several times. With different inputs.
It appeared that this is just a slightly shorter way to write reduce method.
I also read documentation to avoid any kind of doubts.
*/
