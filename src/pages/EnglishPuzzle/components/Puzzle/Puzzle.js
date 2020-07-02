import React, { Component } from 'react';
import PuzzleResult from './PuzzleResult';
import PuzzleRaw from './PuzzleRaw';

class Puzzle extends Component {
  render() {
    return (
      <div className='game--puzzle-wrapper'>
        <PuzzleResult />
        <PuzzleRaw />
      </div>
    );
  }
}

export default Puzzle;
