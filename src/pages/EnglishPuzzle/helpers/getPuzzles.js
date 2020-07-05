import React from 'react';
import { shuffleArray } from './shuffleArray';
import CanvasItem from '../components/Puzzle/CanvasItem';
import { BLANK_IMG } from '../constants/constants';

async function getPuzzles({ src, wordsList, extraWidthValue = 10 }) {
  if (
    !wordsList ||
    !Array.isArray(wordsList) ||
    !wordsList.length ||
    !wordsList.every((el) => typeof el === 'string')
  ) {
    throw new TypeError(
      '"wordsList" argument must be an array containing strings. Example: ["string"]'
    );
  }

  if (!src || typeof src !== 'string') {
    throw new TypeError('"src" argument must be a "string"');
  }

  if (!parseInt(extraWidthValue, 10)) {
    throw new TypeError('"extraWidthValue" argument must be a "number"');
  }

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.src = src;

    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const groupsWords = wordsList.map((word) => word.split(' '));
      const groupsRow = groupsWords.length;
      const EXTRA_WIDTH_VALUE = parseInt(extraWidthValue, 10);
      const result = [];

      let startYPointCropImage = -Math.round(imgHeight / groupsRow);

      groupsWords.forEach((words, i) => {
        const wordCount = words.length;
        const letterCounts = words.reduce(
          (acc, val) => acc + val.replace(/<[^>]*>/g, '').length,
          0
        );
        const reduceLength = letterCounts * EXTRA_WIDTH_VALUE;
        const extraWidth = Math.round(reduceLength / wordCount);
        const onePart = Math.round((imgWidth - reduceLength) / letterCounts);
        const canvasHeight = Math.round(imgHeight / groupsRow);

        startYPointCropImage += canvasHeight;
        let widthCount = 0;

        const isBlank = src === BLANK_IMG;

        const row = () => {
          return shuffleArray(
            words.map((w, j) => {
              const word = w.replace(/<[^>]*>/g, '');
              let canvasWidth = word.length * onePart + extraWidth;
              if (j === wordCount - 1) {
                canvasWidth = imgWidth - widthCount;
                widthCount += canvasWidth;
              } else {
                widthCount += canvasWidth;
              }

              return (
                <CanvasItem
                  canvasRow={i + 1}
                  canvasItem={j + 1}
                  dataItem={`${i + 1}-${j + 1}`}
                  dataWord={word}
                  wordCount={wordCount}
                  widthCount={widthCount}
                  canvasHeight={canvasHeight}
                  canvasWidth={canvasWidth}
                  img={img}
                  startYPointCropImage={startYPointCropImage}
                  key={`${i + 1}-${j + 1}${isBlank ? '-blank' : ''}`}
                />
              );
            })
          );
        };

        result.push(row());
      });
      resolve(result);
    };

    img.onerror = (err) => {
      console.log(err, src);
      reject(err);
    };
  });
}

export { getPuzzles };
