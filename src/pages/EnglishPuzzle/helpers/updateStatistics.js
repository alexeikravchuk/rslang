const countLearnedWords = (results) => {
  return results.reduce((acc, result) => (result ? acc + 1 : acc), 0);
};

const updateStatistics = ({ statistics, currentLevel, currentPage, results }) => {
  const statKey = `${currentLevel}-${currentPage}`;

  let data = statistics.optional.puzzle || { lw: 0, stat: {} }; // lw - learnedWords, stat - statistics

  const oldLearnedWords = data.stat[statKey] ? countLearnedWords(data.stat[statKey].rs) : 0;
  const newLearnedWords = countLearnedWords(results);
  const learnedWords = data.lw ? data.lw - oldLearnedWords + newLearnedWords : newLearnedWords;

  data = {
    lw: learnedWords,
    stat: {
      ...data.stat,
      [statKey]: {
        lv: currentLevel,
        pg: currentPage,
        dt: Date.now(),
        rs: results,
      },
    },
  };

  const newStatistics = { ...statistics, optional: { ...statistics.optional, puzzle: data } };

  return newStatistics;
};

export { updateStatistics };
