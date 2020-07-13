import React, {Component} from 'react';
import {Container, Typography, withStyles} from '@material-ui/core';
import './TrainWord.scss';
import {playSound} from '../../utils/utils';

const styles = theme => ({
  trainWordRoot: {
    display: 'flex',
    //alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.button,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(106, 35, 72, .3)',
    color: '#662246',
    padding: '1rem 3rem',
  },
});

class TrainWord extends Component {

  componentDidMount() {
    playSound(this.props.currentWord);
  }

  componentWillUnmount() {
  }

  render() {
    const {classes, onAnimationStart, onAnimationEnd, currentWord} = this.props;
    return (
      <div onAnimationStart={onAnimationStart}
           onAnimationEnd={onAnimationEnd}
           className={'animate'}>
        <Container className={classes.trainWordRoot}>
          <Typography variant={'h6'} className={classes.title}>
            {currentWord.word}
          </Typography>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(TrainWord);
