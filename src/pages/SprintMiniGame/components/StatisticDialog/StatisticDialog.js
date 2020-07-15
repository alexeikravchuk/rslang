import React from 'react';
import { connect } from 'react-redux';
import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  Tabs,
  Tab,
  DialogActions
} from '@material-ui/core';
import {
  Description,
  Spellcheck,
} from '@material-ui/icons';
import { endGame } from '../../../../store/actions/sprintActions';
import { saveStatistics } from '../../../../store/actions/statisticsActions';
import { StatisticDialogDescription } from '../StatisticDialogDescription/StatisticDialogDescription';
import { StatisticDialogWords } from '../StatisticDialogWords/StatisticDialogWords'

const MuiDialogActions = withStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
    padding: theme.spacing(2),
  },
}))(DialogActions);


function StatisticDialog(props) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { showStatistic, score } = props.sprintState.sprintReducer;
  const { userId, token } = props.sprintState.authReducer;
  const { sprint: sprintStatistics } = props.sprintState.statisticsReducer.optional;
  const scoreRecord = sprintStatistics.scoreRecord || 0;
  const totalScore = sprintStatistics.totalScore || 0;
  const gameCounter = sprintStatistics.gameCounter || 0;
  const { endGame, saveStatistics } = props;
  const appStats = props.sprintState.statisticsReducer;

  const statistics = {
    learnedWords: appStats.learnedWords,
    optional: {
      ...appStats.optional,
      sprint: {
        "scoreRecord": (Math.max(score, scoreRecord)) || 0,
        "totalScore": (totalScore + score) || 0,
        "gameCounter": (gameCounter + 1) || 0,
      }
    }
  }

  const finishGame = (userId, token, statistics) => {
    saveStatistics(userId, token, statistics);
    endGame();
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={showStatistic}
    >
      <DialogTitle>Sprint Results</DialogTitle>
      {value === 0 && <StatisticDialogDescription props={props}/>}
      {value === 1 && <StatisticDialogWords props={props}/>}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        >
        <Tab icon={<Description />} />
        <Tab icon={<Spellcheck />} />
      </Tabs>
      <MuiDialogActions>
        <Button autoFocus onClick={() => finishGame(userId, token, statistics)} color="primary">
          Close
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => {
  return {
    sprintState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    endGame: () => dispatch(endGame()),
    saveStatistics: (userId, token, statistics) => dispatch(saveStatistics(userId, token, statistics))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StatisticDialog)
