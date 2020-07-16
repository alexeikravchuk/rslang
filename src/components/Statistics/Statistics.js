import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, ButtonGroup, Button } from '@material-ui/core';
import { Timeline, Update } from '@material-ui/icons';
import { loadStatistics } from '../../store/actions/statisticsActions';
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

  componentDidMount = () => {
    const { loadStatistics, userId, token } = this.props;
    loadStatistics(userId, token);
  };

  setStatisticsType = (type) => {
    this.setState({ type });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.children}>
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
            <GamesStatistic />
          </Box>
        </div>
      </div>
    );
  }
}

function createStyles(theme) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      background: `url(${statisticBackground}) no-repeat`,
      backgroundSize: '100% 100%',
    },
    buttons: {
      marginTop: theme.spacing(6),
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    children: {},
    box: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    icons: {
      marginRight: theme.spacing(3),
    },
  };
}

const mapStateToProps = ({ statisticsReducer, authReducer: { token, userId } }) => {
  return { statistics: statisticsReducer, token, userId };
};

const mapDispatchToProps = {
  loadStatistics,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(createStyles)(Statistics));
