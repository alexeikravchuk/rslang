async function getWords(page, category) {
  const dataURL = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${category}`;
  const response = await fetch(dataURL);
  const data = await response.json();
  return data;
}

export { getWords };
