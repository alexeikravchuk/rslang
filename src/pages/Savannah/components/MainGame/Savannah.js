import React, {Component} from 'react';
import {CircularProgress, Container, Grid, LinearProgress, withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import GameToolbar from '../GameToolbar/Toolbar';
import {Statistics} from '../Statistics';
import {getWords} from '../../utils/wordRequest';
import {StartGame} from '../StartGame';
import GameButtonGroup from '../ButtonGroup/ButtonGroup';
import './savannah.scss';
import {gameEnding, gameReset, loadWords, loadWordsSuccess} from '../../../../store/actions/savannahAction';
import {playFileSound, pubAudioPath} from '../../utils/utils';
import {loadStatistics, saveStatistics} from '../../../../store/actions/statisticsActions';

const gameEndSound = pubAudioPath('roundEnd');
const styles = {
  title: {
    flexGrow: 1,
    textAlign: 'center',
    color: '#662246',
  },
  loader: {
    position: 'relative',
    zIndex: 2001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    width: '100%',
  },
};

class Savannah extends Component {
  loader(classes) {
    return (
      <Container className={classes}>
        <CircularProgress/>
      </Container>
    );
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {gameEnd, userId, token, load, save, statistics} = this.props;
    if (prevProps.gameEnd !== gameEnd && gameEnd) {
      load(userId, token).then(() => save(userId, token, {
        ...statistics,
        optional: {...statistics.optional, savannah: this.getData(statistics)},
      }));
    }
  }

  getData(statistics) {
    let data = statistics.optional.savannah || {};
    const {points, difficulty, gameLevel} = this.props;
    return {
      ...data,
      [difficulty]: {
        points: points,
        level: gameLevel,
        dt: Date.now(),
      },
    };
  }

  render() {
    const {classes, loading, gameStarted, onClose, gameEnd, fetchWords, gamePoints} = this.props;
    return (
      <div className={'mainGame'}>
        {loading && this.loader(classes.loader)}
        <Grid
          container
          direction={'column'}
          justify={'space-between'}
        >
          <Grid item xs={12}>
            {(gameStarted && !loading) && <GameToolbar title={''} onClose={onClose} to={'/savannah'}/>}
            {(gameStarted && !loading) && <LinearProgress color={'secondary'}
                                                          variant="determinate"
                                                          value={gamePoints}/>}
          </Grid>
          <Grid item xs={12}>
            <Container className={'savannahRoot'}>
              {gameStarted === false && <StartGame/>}
              {gameEnd && <Statistics/>}
              {(gameStarted && !gameEnd) && <GameButtonGroup
                fetch={fetchWords}
                visible={true}
              />}
            </Container>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(store) {
  const {
    savannahReducer,
    statisticsReducer,
    authReducer: {token, userId},
  } = store;
  return {...savannahReducer, statistics: statisticsReducer, token, userId};
}

const mapDispatchToProps = dispatch => ({
  load: (token, userId) => dispatch(loadStatistics(token, userId)),
  save: (token, userId, statistics) => dispatch(saveStatistics(token, userId, statistics)),
  fetchWords: (page, category) => {
    dispatch(loadWords());
    getWords(page, category)
      .then(json => dispatch(loadWordsSuccess(json)));
  },
  onClose: () => {
    playFileSound(gameEndSound);
    dispatch(gameEnding());
  },
  onUnmount: () => dispatch(gameReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Savannah));
