import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Button, Avatar, LinearProgress, Backdrop } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';
import { saveStatistics } from '../../../../store/actions/statisticsActions';
import shuffle from '../../helpers/shuffle';
import getWords from '../../helpers/getWords';
import { playAudio } from '../../helpers/playAudio';
import { DATA_LINK } from '../../../../constants/urlsRequests';
import { dontKnow } from '../../constants/constants';
import defaultAudioImage from '../../../../assets/default-audiocall.png';
import correctSound from '../../../../assets/correct.mp3';
import errorSound from '../../../../assets/error.mp3';
import answerCorrect from '../../../../assets/correct.png';
import answerWrong from '../../../../assets/wrong.png';
import { AboutGame } from '../AboutGame';
import { Statistics } from '../Statistics';

class MainGame extends Component {
  state = {
    audio: null,
    translates: [],
    answerImage: answerCorrect,
    variants: [],
    gameFinish: false,
    showAnswer: false,
  };

  componentDidMount = () => {
    this.generateGame();
  };

  generateGame = () => {
    document.addEventListener('keydown', this.handleKeyDown, false);

    getWords(this.props.round, this.props.difficulty).then((data) => {
      data.forEach((el) => {
        this.state.translates.push(el.wordTranslate);
      });
      let gameWords = shuffle(data).slice(0, 10);
      this.setState({
        gameWords,
        image: defaultAudioImage,
        currentWord: gameWords[0].word,
        gameFinish: false,
        progress: 0,
        roundClear: false,
        correctAnswers: [],
        wrongAnswers: [],
        showAnswer: false,
        gameButton: dontKnow,
        correctNumber: 5,
      });
      setTimeout(() => this.playCurrentAudio(), 400);
      this.createVariants();
    });
  };

  createVariants = () => {
    const { translates, gameWords } = this.state;
    this.setState({ variants: [] });
    let currentWord = translates.indexOf(gameWords[0].wordTranslate);
    translates.splice(currentWord, 1);
    let variants = shuffle(translates).slice(0, 4);
    variants.push(gameWords[0].wordTranslate);
    let showVariants = shuffle(variants);
    this.setState({ variants: showVariants });
  };

  checkAnswer = (opt) => {
    const { variants, gameWords, correctAnswers, wrongAnswers } = this.state;
    let selectedAnswer = variants[opt];
    let correctAnswer = gameWords[0].wordTranslate;

    this.setState({
      roundClear: true,
      gameButton: '→',
      correctNumber: opt,
      showAnswer: true,
      image: `${DATA_LINK}${gameWords[0].image}`,
    });

    if (selectedAnswer === correctAnswer) {
      correctAnswers.push(gameWords[0]);
      this.setState({
        answerImage: answerCorrect,
      });
      return playAudio(correctSound);
    }
    wrongAnswers.push(gameWords[0]);
    this.setState({
      answerImage: answerWrong,
    });
    return playAudio(errorSound);
  };

  nextRound = () => {
    const { wrongAnswers, gameWords, gameButton, progress } = this.state;
    this.setState({ progress: progress + 10 });

    if (gameButton === dontKnow) {
      wrongAnswers.push(gameWords[0]);
    }

    if (gameWords.length > 1) {
      gameWords.shift();
      this.setState({
        roundClear: false,
        gameButton: dontKnow,
        showAnswer: false,
        image: defaultAudioImage,
        correctNumber: 5,
        gameWords,
        currentWord: gameWords[0].word,
      });
      this.playCurrentAudio();
      return this.createVariants();
    }
    this.saveResult();
    return this.setState({ gameFinish: true });
  };

  saveResult = () => {
    try {
      const { difficulty, round, statistics, token, userId, dispatch } = this.props;
      const { correctAnswers, wrongAnswers } = this.state;

      const correctResult = correctAnswers.map((word) => parseInt(word.image.split('_')[1], 10));
      const wrongResult = wrongAnswers.map((word) => parseInt(word.image.split('_')[1], 10));

      const key = `${difficulty}-${round}`;
      const oldData = statistics.optional.call;
      const oldCorrect = oldData[key] ? oldData[key].c : [];
      const oldWrong = oldData[key] ? oldData[key].w : [];
      const newWrong = Array.from(new Set(oldWrong.concat(wrongResult))).filter(
        (item) => !correctResult.includes(item)
      );
      const newCorrect = Array.from(new Set(oldCorrect.concat(correctResult))).filter(
        (item) => !newWrong.includes(item)
      );

      const data = { ...oldData, [key]: { w: newWrong, c: newCorrect } };
      const newStatistics = { ...statistics, optional: { ...statistics.optional, call: data } };
      dispatch(saveStatistics(userId, token, newStatistics));
      console.log(
        'correctResult',
        correctResult,
        'newCorrect',
        newCorrect,
        'wrongResult',
        wrongResult,
        'newWrong',
        newWrong
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  playCurrentAudio = () => {
    playAudio(`${DATA_LINK}${this.state.gameWords[0].audio}`);
  };

  handleKeyDown = (e) => {
    switch (e.key) {
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
        return 0;
    }
  };

  finishGame = () => {
    this.generateGame();
  };

  render() {
    const { classes, gameEnds } = this.props;
    const {
      gameFinish,
      image,
      variants,
      answerImage,
      currentWord,
      correctNumber,
      roundClear,
      gameButton,
      progress,
      showAnswer,
    } = this.state;
    const show = gameFinish ? (
      <Statistics {...this.state} finishGame={this.finishGame} />
    ) : (
      <div className={classes.root}>
        <Avatar
          className={classes.large}
          alt='Current word image'
          src={image}
          onClick={this.playCurrentAudio}
        />
        <div style={{ opacity: +showAnswer }}>{currentWord}</div>
        <div className={classes.variants}>
          {new Array(5).fill(0).map((_, i) => (
            <Fragment key={i}>
              <ColorButton
                disabled={roundClear}
                variant='outlined'
                color='primary'
                className={classes.variant}
                onClick={() => this.checkAnswer(i)}>
                <Avatar
                  className={classes.small}
                  src={answerImage}
                  style={{ display: correctNumber === i ? 'block' : 'none' }}
                />
                {`${i + 1} `}
                {variants[i]}
              </ColorButton>
            </Fragment>
          ))}
        </div>
        <div>
          <Button variant='contained' onClick={this.nextRound}>
            {gameButton}{' '}
          </Button>
        </div>

        <div>
          <Button variant='contained' color='secondary' onClick={gameEnds}>
            Back
          </Button>
        </div>
        <div className={classes.progress}>
          <LinearProgress variant='determinate' value={progress} />
        </div>
        <AboutGame />
      </div>
    );

    return (
      <Backdrop className={classes.backdrop} open={true}>
        {show}
      </Backdrop>
    );
  }
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
    backdrop: {
      position: 'relative',
      width: '100%',
      minHeight: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.4)',
    },
    root: {
      width: '100%',
      maxWidth: 800,
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
    variant: {
      position: 'relative',
    },
    small: {
      position: 'absolute',
      left: -(theme.spacing(3) + 2),
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
      width: '95%',
    },
  };
}

const mapStateToProps = (store) => {
  const {
    statisticsReducer,
    authReducer: { token, userId },
  } = store;
  return { statistics: statisticsReducer, token, userId };
};

export default connect(mapStateToProps)(withStyles(createStyles)(MainGame));
