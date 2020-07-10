import React, { Component } from 'react';
import audiocallBackground from '../../../assets/audiocall-background.jpg';
import { Backdrop, withStyles } from '@material-ui/core';
import { Intro } from './Intro';
import { GameSettings } from './GameSettings';
import { MainGame } from './MainGame';

class AudioCall extends Component {
  constructor(props){
    super(props)
    this.state = {
      gameStarted: false,
      difficulty: 1,
      round: 1
    };
    this.gameStarts = this.gameStarts.bind(this);
    this.gameEnds = this.gameEnds.bind(this);
  }
  
  сhangeDifficulty = (e, value) => {
    this.setState({ difficulty: value })
  };

  сhangeRound = (e, value) => {
    this.setState({ round: value })
  };

  handleDragStop = () => this.props.update(this.state.value);

  gameStarts(){
    this.setState({
      gameStarted: true,
      difficulty: this.state.difficulty,
      round: this.state.round
    });
  }
  
  gameEnds(){
    this.setState({
      gameStarted: false,
    });
  }

  render(){
    let show;
    const { classes } = this.props;
    const { gameStarted } = this.state;
    
    if (!gameStarted) {
      show = 
        <div>
          <Intro  gameStarts={this.gameStarts} />
          <GameSettings 
            сhangeDifficulty={this.сhangeDifficulty}
            сhangeRound={this.сhangeRound}  
            handleDragStop={this.handleDragStop}
            
          />
        </div>
    } else {
      show = <MainGame {...this.state} gameEnds={this.gameEnds}/>;
    }
    return (
      <Backdrop className={classes.backdrop} open={true}>
        {show}
      </Backdrop>
    );
  }
}
  
function createStyles() {
  return {
    backdrop: {
      position: 'relative',
      minHeight: '100%',
      overflowY: 'hidden',
      width: '100%',
      background: `url(${audiocallBackground})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: 100,
    },
  };
}
  
  export default withStyles(createStyles)(AudioCall);
  