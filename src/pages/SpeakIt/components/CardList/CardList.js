import React, { Component } from 'react';
import Card from './Card';

class CardList extends Component {
  render() {
    return (
      <div className='cards'>
        {this.props.words.length ? (
          this.props.words.map((word, i) => (
              <Card
                word={word}
                isActive={this.props.activeCards.includes(i)}
                key={word.id}
                onClick={this.props.onCardClick}
              />
            ))
        ) : (
          <div className='spiner' />
        )}
      </div>
    );
  }
}

export default CardList;
