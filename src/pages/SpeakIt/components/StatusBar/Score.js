import React, { Component } from 'react';

class Score extends Component {
  getStars(score) {
    return new Array(this.props.score)
      .fill(1)
      .map((item, i) => <div className='star' key={'start' + i}></div>);
  }

  render() {
    return <div className='score'>{this.getStars(this.props.score)}</div>;
  }
}

export default Score;
