import { shuffleArray } from './shuffleArray';

function shufflePuzzles(puzzlesElement) {
  const puzzles = shuffleArray(
    Array.from(puzzlesElement.querySelectorAll('.canvas-item'))
  );
  puzzlesElement.append(...puzzles);
  return puzzlesElement;
}

export { shufflePuzzles };
