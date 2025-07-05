export function getLetterStatus(allLetters, letter) {
  const priority = { Green: 3, Yellow: 2, Gray: 1, unset: 0 };
  let maxStatus = "unset";

  allLetters.forEach((obj) => {
    if (obj.letter.toUpperCase() === letter.toUpperCase()) {
      if (priority[obj.status] > priority[maxStatus]) {
        maxStatus = obj.status;
      }
    }
  });

  return maxStatus;
}
