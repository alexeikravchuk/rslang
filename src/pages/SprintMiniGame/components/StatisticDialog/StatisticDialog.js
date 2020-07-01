import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  Tabs,
  Tab
} from '@material-ui/core';
import {
  Description,
  Spellcheck,
} from '@material-ui/icons';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { endGame } from '../../../../store/actions/sprintActions';
import { StatisticDialogDescription } from '../StatisticDialogDescription/StatisticDialogDescription';
import { StatisticDialogWords } from '../StatisticDialogWords/StatisticDialogWords'

const DialogActions = withStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);


function StatisticDialog(props) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={props.sprintState.showStatistic}
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
      <DialogActions>
        <Button autoFocus onClick={props.endGame} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => {
  return {
    sprintState: state.sprintReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    endGame: () => dispatch(endGame()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StatisticDialog)
