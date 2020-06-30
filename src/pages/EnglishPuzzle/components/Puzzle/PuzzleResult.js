import React, { Component } from 'react';

class PuzzleResult extends Component {
  render() {
    return (
      <div className='game--puzzle-results result'>
        <div className='result-field--background'></div>
        {new Array(10).fill(0).map((_, i) => (
          <div className='result--sentence' key={'reault-' + i}>
            <div
              className={
                'result--sentence-numeration' + (i > 1 ? ' hidden' : '')
              }>
              <span>{i + 1}</span>
            </div>
            <div
              className={
                'result--sentence-text_container' +
                (i > 1 ? '' : ' current-sentence')
              }></div>
          </div>
        ))}
      </div>
    );
  }
}

export default PuzzleResult;
