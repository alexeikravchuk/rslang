import React, { Component } from 'react';
import { StatusBar } from '../StatusBar';
import { ImagesBlock } from '../ImagesBlock';
import { CardList } from '../CardList';
import { Buttons } from '../Buttons';

class MainPage extends Component {
  render() {
    return (
      <div className='main-page'>
        <StatusBar level={this.props.level} />
        <ImagesBlock />
        <CardList words={this.props.words} />
        <Buttons />
      </div>
    );
  }
}

export default MainPage;
