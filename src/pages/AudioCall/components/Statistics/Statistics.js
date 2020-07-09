import React from 'react';
import { withStyles, Button, Avatar, ButtonGroup, Typography, Fade  } from '@material-ui/core';
import speaker from '../../../../assets/speaker.png';
import { apiData } from '../../constants/constants';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      page: true
    }
    this.showCorrect=this.showCorrect.bind(this);
    this.showWrong=this.showWrong.bind(this)
  }

  playAudio(src) {
    if (!this.audio) {
      this.audio = new Audio(src);
      this.audio.play();
      this.audio.addEventListener('ended', () => { this.audio = null; });
    }
  }

  generateAnswers(answersObj){
    const { classes } = this.props;
    let answers = answersObj.map((item, index) => 
      <div key = {index} className={classes.root}>
        <Avatar className={classes.small} src={speaker} onClick={this.playAudio.bind(this,`${apiData}${item.audio}`)}/>
        <Typography>{item.word}</Typography>
        <span> - </span>
        <Typography>{item.wordTranslate}</Typography>
      </div>
    )
    return answers
  }

  showCorrect(){
    this.setState({ page: true })
  }

  showWrong(){
    this.setState({ page: false })
  }

  render(){
      let show;
      const { classes, correctAnswers, wrongAnswers, finishGame } = this.props;
      const { page } = this.state;
      if (page) {
        show = 
        <div>
          <Typography>You know - {correctAnswers.length}</Typography>
            <div>
                  {this.generateAnswers(correctAnswers)}
            </div>
        </div>
      } else {
        show = 
        <div>
        <Typography>Need to learn - {wrongAnswers.length}</Typography>
          <div>
                {this.generateAnswers(wrongAnswers)}
          </div>
      </div>
      }
      return (
      <Fade in={true}>
      <div className={classes.main} >
        <Typography variant="h4">Score</Typography>
        <ButtonGroup className={classes.buttons} variant="contained"  aria-label="contained primary button group">
          <Button color="primary" onClick={this.showCorrect}>Correct</Button>
          <Button color="secondary" onClick={this.showWrong}>Wrong</Button>
        </ButtonGroup>
        <div open={true}>
          {show}
        </div>
        <Button className={classes.buttons} variant="contained" color="secondary"  onClick={finishGame}>
          Try again
        </Button>
      </div>
      </Fade>
      );
  }
}

function createStyles(theme) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    buttons: {
      margin: theme.spacing(1),
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },

  };
}

export default withStyles(createStyles)(Statistics);
