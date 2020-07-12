export function buildNewStatistics(statistics, activeCardIndexes) {
  const isStatLoaded = localStorage.isStatLoaded && JSON.parse(localStorage.isStatLoaded);
  let newStatistics = null;

  if (activeCardIndexes.length && !isStatLoaded) {
    let data = statistics.optional.speakIt || {};
    const { group, page, part } = localStorage.currentWords
      ? JSON.parse(localStorage.currentWords)
      : {
          group: 0,
          page: 0,
          part: 0,
        };

    data[Date.now()] = {
      gr: group,
      pg: page,
      pt: part,
      ok: activeCardIndexes,
    };

    const keys = Object.keys(data);
    if (keys.length > 20) {
      data = filterData(data);
    }

    newStatistics = { ...statistics, optional: { ...statistics.optional, speakIt: data } };
  }

  localStorage.removeItem('isStatLoaded');
  return newStatistics;
}

function filterData(data) {
  const keys = Object.keys(data).sort((a, b) => a - b);
  const newData = {};
  keys.slice(-20).forEach((key) => {
    newData[key] = data[key];
  });
  return newData;
}
