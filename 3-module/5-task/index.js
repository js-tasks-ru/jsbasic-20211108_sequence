function getMinMax(str) {
  let splitStr = str.split(" ");
  let numbers = splitStr.filter((val) => +val).map((val => +val));
  return {min: Math.min(...numbers), max: Math.max(...numbers)};
}
