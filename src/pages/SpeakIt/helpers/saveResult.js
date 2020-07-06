export function saveResult(words, activeCardIndexes) {
  const isStatLoaded =
    localStorage.isStatLoaded && JSON.parse(localStorage.isStatLoaded);
  
  if (activeCardIndexes.length && !isStatLoaded) {
    const data = localStorage.stat ? JSON.parse(localStorage.stat) : {};

    data[new Date().toLocaleString()] = {
      errors: words.length - activeCardIndexes.length,
      succes: activeCardIndexes.length,
      words,
      activeCardIndexes,
    };

    localStorage.stat = JSON.stringify(data);
  }

  localStorage.removeItem('isStatLoaded');
}
