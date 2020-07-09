import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Score extends Component {
  static propTypes = {
    score: PropTypes.number,
  };

  static defaultProps = {
    score: 0,
  };

  getStars(score) {
    return new Array(score)
      .fill(1)
      .map((_, i) => <div className='star' key={'start' + i}></div>);
  }

  render() {
    const { score } = this.props;
    return <div className='score'>{this.getStars(score)}</div>;
  }
}
