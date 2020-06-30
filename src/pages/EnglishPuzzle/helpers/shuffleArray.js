function shuffleArray(arr) {
  let j;
  const newArr = arr;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [arr[j], arr[i]];
  }
  return newArr;
}

export { shuffleArray };
