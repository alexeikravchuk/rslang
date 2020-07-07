import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { playSentence } from '../../helpers';

class ResultItem extends Component {
  handleClick = () => {
    const { word } = this.props;
    playSentence(word);
  };

  render() {
    const {
      word: { textExample },
    } = this.props;
    return (
      <div className='result-item' onClick={this.handleClick}>
        <i className='material-icons'>volume_up</i>
        <p className='result-item--sentence'>{textExample.replace(/<[^>]*>/g, '')}</p>
      </div>
    );
  }
}

ResultItem.propTypes = {
  words: PropTypes.object.isRequired,
};

export { ResultItem };
