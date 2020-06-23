import React, { Component } from 'react';
import Card from './Card';

class CardList extends Component {
  render() {
    const part = parseInt(Math.random() * 2, 10);
    return (
      <div className='cards'>
        {this.props.words.splice(part * 10, 10).map((word) => (
          <Card word={word} key={word.id}/>
        ))}
      </div>
    );
  }
}

export default CardList;
