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
import Grid from '@material-ui/core/Grid';

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

  render() {
    const {classes, loading, gameStarted, onClose, gameEnd, fetchWords} = this.props;
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
  const {savannahReducer} = store;
  return {...savannahReducer};
}

const mapDispatchToProps = dispatch => ({
  fetchWords: (page, category) => {
    dispatch(loadWords());
    getWords(page, category)
      .then(json => dispatch(loadWordsSuccess(json)));
  },
  onClose: () => dispatch(gameEnding()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Savannah));
