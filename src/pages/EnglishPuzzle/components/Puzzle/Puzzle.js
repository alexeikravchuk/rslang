import React, { Component } from 'react';
import PuzzleResult from './PuzzleResult';
import PuzzleRow from './PuzzleRow';

class Puzzle extends Component {
  render() {
    return (
      <div className='game--puzzle-wrapper'>
        <PuzzleResult />
        <PuzzleRow />
      </div>
    );
  }
}

export default Puzzle;
