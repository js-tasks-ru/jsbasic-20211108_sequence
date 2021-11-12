function camelize(str) {
  let words = str.split("-");
  words = [words[0], ...words.slice(1).map((word) => word[0].toUpperCase() + word.slice(1))];
  return words.join("");
}
