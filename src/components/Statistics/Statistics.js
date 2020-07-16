import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, ButtonGroup, Button } from '@material-ui/core';
import { Timeline, Update } from '@material-ui/icons';
import CardsStatistic from './CardsStatistic';
import GamesStatistic from './GamesStatistic';
import statisticBackground from '../../assets/statistics.jpg';

class Statistics extends Component {
  state = {
    type: 'current',
    difficulty: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  };

  setStatisticsType = (type) => {
    this.setState({ type });
  };

  render() {
    const { classes, statistics } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.buttons}>
          <ButtonGroup variant='contained' color='primary'>
            <Button onClick={() => this.setStatisticsType('current')}>
              <Update className={classes.icons} />
              Current
            </Button>
            <Button onClick={() => this.setStatisticsType('summary')}>
              <Timeline className={classes.icons} />
              Summary
            </Button>
          </ButtonGroup>
        </div>
        <Box className={classes.box}>
          <CardsStatistic />
          <GamesStatistic statistics={statistics} />
        </Box>
      </div>
    );
  }
}

function createStyles(theme) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      background: `url(${statisticBackground}) no-repeat`,
      backgroundSize: '100% 100%',
    },
    buttons: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1),
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    box: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icons: {
      marginRight: theme.spacing(3),
    },
  };
}

const mapStateToProps = ({ statisticsReducer }) => {
  return { statistics: statisticsReducer };
};

export default connect(mapStateToProps)(withStyles(createStyles)(Statistics));
