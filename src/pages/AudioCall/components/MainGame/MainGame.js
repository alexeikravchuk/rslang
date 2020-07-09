import React, { Component} from 'react';
import { withStyles, Button, Avatar, LinearProgress, Backdrop  } from '@material-ui/core';
import shuffle from '../../helpers/shuffle';
import getWords from '../../helpers/getWords';
import { apiData } from '../../constants/constants';
import { dontKnow } from '../../constants/constants';
import defaultAudioImage from '../../../../assets/default-audiocall.png';
import correctSound from '../../../../assets/correct.mp3';
import errorSound from '../../../../assets/error.mp3';
import answerCorrect from '../../../../assets/correct.png';
import answerWrong from '../../../../assets/wrong.png';
import { amber } from '@material-ui/core/colors';
import { AboutGame } from '../AboutGame';
import { Statistics } from '../Statistics';

class MainGame extends Component{
  constructor(props) {
    super(props);
    this.state ={
      image: defaultAudioImage,
      audio: null,
      translates: [],
      gameWords: [],
      currentWord: 'word',
      showAnswer: 'none',
      answerImage: answerCorrect,
      correctNumber: 5,
      roundClear: false,
      gameButton: dontKnow,
      variants: [],
      progress: 0,
      correctAnswers: [], 
      wrongAnswers: [],
      gameFinish: false,
    }
    this.playCurrentAudio = this.playCurrentAudio.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.finishGame = this.finishGame.bind(this); 
  }

playAudio(src) {
  if (!this.audio) {
    this.audio = new Audio(src);
    this.audio.play();
    this.audio.addEventListener('ended', () => { this.audio = null; });
  }
}

componentDidMount(){
  this.generateGame();
}

generateGame(){
  document.addEventListener("keydown", this.handleKeyDown, false);

  getWords(this.props.round, this.props.difficulty).then((data) => {  
    data.forEach(el => {
      this.state.translates.push(el.wordTranslate)
    })
      let gameWords = shuffle(data).slice(0, 10);
      this.setState({ gameWords });
      this.setState({ currentWord: this.state.gameWords[0].word });
      this.playCurrentAudio();
      this.createVariants();
  })
}

createVariants(){
  this.setState({ variants: [] });
  let currentWord =  this.state.translates.indexOf(this.state.gameWords[0].wordTranslate)
  this.state.translates.splice(currentWord, 1);
  let variants = shuffle(this.state.translates).slice(0,4);
  variants.push(this.state.gameWords[0].wordTranslate); 
  let showVariants = shuffle(variants);
  this.setState({ variants: showVariants });

}

checkAnswer(opt){
    let selectedAnswer = this.state.variants[opt];
    let correctAnswer = this.state.gameWords[0].wordTranslate;
    this.setState({
      roundClear: true,
      gameButton: '→',
      correctNumber: opt,
      showAnswer: 'block',
      image: `${apiData}${this.state.gameWords[0].image}`
    })
  if(selectedAnswer === correctAnswer){
    this.setState({ 
      correctAnswers: this.state.correctAnswers.concat([this.state.gameWords[0]])
    })
    this.setState({answerImage: answerCorrect});
    this.playAudio(correctSound);
  } else {
    this.setState({ 
      wrongAnswers: this.state.wrongAnswers.concat([this.state.gameWords[0]])
    })
    this.setState({answerImage: answerWrong})
    this.playAudio(errorSound);
  }
}

nextRound(){
  if(this.state.gameButton === dontKnow){
    this.setState({ 
      wrongAnswers: this.state.wrongAnswers.concat([this.state.gameWords[0]])
    })
  }
    this.setState({ progress: this.state.progress + 10 })
  if(this.state.gameWords.length > 1 ){
    this.state.gameWords.shift();
    this.setState({ 
      roundClear: false, 
      gameButton: dontKnow,
      showAnswer: 'none',
      image: defaultAudioImage,
      correctNumber: 5,
      gameWords: this.state.gameWords,
      currentWord: this.state.gameWords[0].word
    });
    this.playCurrentAudio()
    this.createVariants()
  } else {
    this.setState({ gameFinish: true });
  }
}

playCurrentAudio(){
  this.playAudio(`${apiData}${this.state.gameWords[0].audio}`);
}

handleKeyDown = (e) => {
  switch(e.key){
    case 'Enter':
      this.nextRound();
      break;
    case '1':
      this.checkAnswer(0);
      break;
    case '2':
      this.checkAnswer(1);
      break;
    case '3':
      this.checkAnswer(2);
      break;
    case '4':
      this.checkAnswer(3);
      break;
    case '5':
        this.checkAnswer(4);
        break;
    default: 
        this.nextRound();
  }
}

finishGame(){
  this.generateGame();
  this.setState({
    gameFinish: false,
    progress: 0,
    correctAnswers: [], 
    wrongAnswers: [],
  });
}

render(){
  let show;
  const { classes, gameEnds } = this.props;
  const {gameFinish, image, variants, answerImage, currentWord, correctNumber, roundClear, gameButton, progress} = this.state;
  if (!gameFinish) {
    show = 
    <div className={classes.root} >
      <Avatar className={classes.large} alt="Current word image" src={image} onClick={this.playCurrentAudio} />
      <div style = {{ display: this.state.showAnswer}}>{currentWord}</div>
      <div className={classes.variants}>
        <Avatar className={classes.small} src={answerImage} style={{display: correctNumber === 0  ? 'block' : 'none'}}/>
        <ColorButton disabled={roundClear} variant="outlined" color="primary" onClick={() => this.checkAnswer(0)}>
          1 {variants[0]}
        </ColorButton>
        <Avatar className={classes.small}  src={answerImage} style={{display: correctNumber === 1  ? 'block' : 'none'}}/>
        <ColorButton disabled={roundClear} variant="outlined" color="primary" onClick={() => this.checkAnswer(1)}>
          2 {variants[1]}
        </ColorButton>
        <Avatar className={classes.small} src={answerImage} style={{display: correctNumber === 2  ? 'block' : 'none'}}/>
        <ColorButton disabled={roundClear} variant="outlined" color="primary" onClick={() => this.checkAnswer(2)}>
          3 {variants[2]}
        </ColorButton>
        <Avatar className={classes.small} src={answerImage} style={{display: correctNumber === 3  ? 'block' : 'none'}}/>
        <ColorButton disabled={roundClear} variant="outlined" color="primary" onClick={() => this.checkAnswer(3)}>
          4 {variants[3]}
        </ColorButton>
        <Avatar className={classes.small} src={answerImage} style={{display: correctNumber === 4  ? 'block' : 'none'}}/>
        <ColorButton disabled={roundClear} variant="outlined" color="primary" onClick={() => this.checkAnswer(4)}>
          5 {variants[4]}
        </ColorButton>
      </div>
      <div>
        <Button variant="contained" onClick={this.nextRound}>{gameButton} </Button>
      </div>

      <div>
        <Button variant="contained" color="secondary" onClick={gameEnds}>Back</Button>
      </div>
      <div className={classes.progress}>
        <LinearProgress  variant="determinate" value={progress} />   
      </div>
      <AboutGame />

    </div>
  } else {
    show = <Statistics {...this.state} finishGame = {this.finishGame}/>;
  }
   return(
    <Backdrop className={classes.backdrop} open={true}>
      {show}
    </Backdrop>
    )    
 };
}

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[500],
    '&:hover': {
      backgroundColor: amber[700],
    },
  },
}))(Button);

function createStyles(theme) {
  return {
    root: {
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    variants: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    margin: {
      height: theme.spacing(3),
    },
    progress: {
      width: '100%'
    }
  };
}

export default withStyles(createStyles)(MainGame);
