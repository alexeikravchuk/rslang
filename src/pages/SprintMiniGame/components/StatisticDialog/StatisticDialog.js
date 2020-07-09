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

  const { scoreRecord, totalScore, gameCounter, showStatistic } = props.sprintState.sprintReducer;
  const { userId, token } = props.sprintState.authReducer;

  const data = {
    "optional": {
      "scoreRecord": scoreRecord,
      "totalScore": totalScore,
      "gameCounter": gameCounter,
    }
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
        <Button autoFocus onClick={() => props.endGame(data, userId, token)} color="primary">
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
    endGame: (data, id, token) => dispatch(endGame(data, id, token)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StatisticDialog)
