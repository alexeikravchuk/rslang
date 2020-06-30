import React, { Component } from 'react';
import { shufflePuzzles } from '../../helpers';

class PuzzleRow extends Component {
  render() {
    const { puzzles } = this.props;
    return (
      <div className='game--puzzle-raw raw'>
        {puzzles && shufflePuzzles(puzzles[0])}
      </div>
    );
  }
}

export default PuzzleRow;
