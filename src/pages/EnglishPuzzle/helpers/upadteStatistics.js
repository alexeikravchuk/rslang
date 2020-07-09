import { saveStaistics } from './statisticsUtil';

const countLearnedWords = (results) => {
  return results.reduce((acc, result) => (result ? acc + 1 : acc), 0);
};

const updateStatistics = ({ statistics, currentLevel, currentPage, results }) => {
  const statKey = `${currentLevel}-${currentPage}`;

  const oldLearnedWords = statistics.optional[statKey]
    ? countLearnedWords(statistics.optional[statKey].results)
    : 0;
  const newLearnedWords = countLearnedWords(results);
  const learnedWords = statistics.learnedWords
    ? statistics.learnedWords - oldLearnedWords + newLearnedWords
    : newLearnedWords;

  const newStatistics = {
    learnedWords,
    optional: {
      ...statistics.optional,
      [statKey]: {
        level: currentLevel,
        page: currentPage,
        date: Date.now(),
        results: results,
      },
    },
  };

  saveStaistics(newStatistics);
  return newStatistics;
};

export { updateStatistics };
