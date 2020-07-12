export function getSavedResult(target) {
  localStorage.isStatLoaded = JSON.stringify(true);
  const statistics = JSON.parse(localStorage.stat);

  const targetRow = target.parentNode.parentNode;
  const key = `${targetRow.children[0].innerText}, ${targetRow.children[1].innerText}`;

  const words = statistics[key].words;
  const succesWordIndexes = statistics[key].activeCardIndexes;

  return { words, succesWordIndexes };
}
