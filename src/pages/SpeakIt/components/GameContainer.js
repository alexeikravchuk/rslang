import React, { Component } from 'react';
import Intro from './Intro';

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
    };
  }

  startBtnClickHandler() {
    this.setState({ gameStarted: true });
  }

  render() {
    return (
      <React.Fragment>
        <Intro
          open={!this.state.gameStarted}
          onClick={() => this.startBtnClickHandler()}
        />
      </React.Fragment>
    );
  }
}

export default GameContainer;
