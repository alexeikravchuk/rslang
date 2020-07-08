import React, {Component} from 'react';
import {withStyles, Container, CircularProgress} from '@material-ui/core';
import {connect} from 'react-redux';
import GameToolbar from '../GameToolbar/Toolbar';
import {Statistics} from '../Statistics';
import {getWords} from '../../utils/wordRequest';
import {StartGame} from '../StartGame';
import GameButtonGroup from '../ButtonGroup/ButtonGroup';
import './savannah.scss';
import {
  gameEnding,
  loadWords,
  loadWordsSuccess,
} from '../../../../store/actions/savannahAction';
import {playFileSound, pubAudioPath} from '../../utils/utils';

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
    height: '80vh',
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

  render() {
    const {classes, loading, gameStarted, onClose, gameEnd, fetchWords} = this.props;
    return (
      <div className={'mainGame'}>
        {loading && this.loader(classes.loader)}
        {(gameStarted && !loading) && <GameToolbar title={''} onClose={onClose} to={'/savannah'}/>}
        <Container className={'savannahRoot'}>
          {gameStarted === false && <StartGame/>}
          {gameEnd && <Statistics/>}
          {(gameStarted && !gameEnd) && <GameButtonGroup
            fetch={fetchWords}
            visible={true}
          />}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(store) {
  const {savannahReducer} = store;
  return {...savannahReducer};
}

const mapDispatchToProps = dispatch => ({
  fetchWords: (page, category) => {
    dispatch(loadWords());
    getWords(page, category)
      .then(json => dispatch(loadWordsSuccess(json)));
  },
  onClose: () => {
    playFileSound(gameEndSound);
    dispatch(gameEnding());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Savannah));
