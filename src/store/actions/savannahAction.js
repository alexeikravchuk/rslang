const ADD_NEW_WORDS = 'ADD_NEW_WORDS';
const ADD_LEARNED_WORDS = 'ADD_LEARNED_WORDS';
const ADD_MISSED_WORDS = 'ADD_MISSED_WORDS';
const LOAD_WORDS = 'LOAD_WORDS';
const LOAD_WORDS_SUCCESS = 'LOAD_WORDS_SUCCESS';
const GAME_STARTING = 'GAME_STARTING';
const LIFE_DECREASE = 'LIFE_DECREASE';
const GAME_END = 'GAME_END';
const RESET_GAME = 'RESET_GAME';
const DIFFICULTY_CHANGE = 'DIFFICULTY_CHANGE';
const REMOVE_WORD = 'REMOVE_WORD';
const LEVEL_UP = 'LEVEL_UP';
const ADD_POINTS = 'ADD_POINTS';
const RESET_POINTS = 'RESET_POINTS';

const loadWords = () => {
  return (
    {
      type: LOAD_WORDS,
    }
  );
};

const gameStarting = () => {
  return (
    {
      type: GAME_STARTING,
    }
  );
};

const gameReset = () => {
  return {
    type: RESET_GAME,
  };
};

const gameEnding = () => {
  return {
    type: GAME_END,
  };
};

const loadWordsSuccess = (words) => {
  return (
    {
      type: LOAD_WORDS_SUCCESS,
      words,
    }
  );
};

const difficultyChange = (difficulty) => {
  return (
    {
      type: DIFFICULTY_CHANGE,
      difficulty,
    }
  );
};

const lifeDecrease = () => {
  return {type: LIFE_DECREASE};
};

const addLearnedWords = (word) => {
  return (
    {
      type: ADD_LEARNED_WORDS,
      word: word,
    }
  );
};

const addMissedWords = (word) => {
  return (
    {
      type: ADD_MISSED_WORDS,
      word,
    }
  );
};

const removeWord = (word) => {
  return (
    {
      type: REMOVE_WORD,
      word,
    }
  );
};

const addPoints = (points) => {
  return (
    {
      type: ADD_POINTS,
      points,
    }
  );
};

const levelUp = () => {
  return (
    {
      type: LEVEL_UP,
    }
  );
};
const resetPoints = () => {
  return (
    {
      type: RESET_POINTS,
    }
  );
};

export {
  ADD_NEW_WORDS,
  ADD_LEARNED_WORDS,
  ADD_MISSED_WORDS,
  LOAD_WORDS,
  LOAD_WORDS_SUCCESS,
  GAME_STARTING,
  GAME_END,
  LIFE_DECREASE,
  RESET_GAME,
  DIFFICULTY_CHANGE,
  REMOVE_WORD,
  LEVEL_UP,
  ADD_POINTS,
  RESET_POINTS,
  addLearnedWords,
  addMissedWords,
  loadWords,
  loadWordsSuccess,
  gameStarting,
  gameEnding,
  lifeDecrease,
  gameReset,
  difficultyChange,
  removeWord,
  levelUp,
  addPoints,
  resetPoints,
};
