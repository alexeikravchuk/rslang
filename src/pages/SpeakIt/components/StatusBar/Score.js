import React, { Component } from 'react';

class Score extends Component {

  getStars(score) {
    return new Array(this.props.score).fill(1).map((item, i) => (
      <div className='star' key={('start' + i)}></div>
    ))
  }

  render() {
    return (
      <div className='score'>
        {this.getStars(this.props.score)}
      </div>
    );
  }
}

export default Score;

// import { createElement } from '../utility';

// export default class Score {
//   constructor() {
//     this.score = 0;
//   }

//   getElement() {
//     return this.buildElement();
//   }

//   buildElement() {
//     this.scoreElement = createElement('div', 'score');
//     return this.scoreElement;
//   }

//   increaseScore() {
//     this.score += 1;
//     this.scoreElement.append(createElement('div', 'star'));
//   }

//   resetScore() {
//     this.score = 0;
//     this.scoreElement.innerHTML = '';
//   }
// }
