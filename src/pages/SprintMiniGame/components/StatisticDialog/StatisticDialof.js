import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContentText,
  Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Rating from '@material-ui/lab/Rating';
import { endGame } from '../../../../store/actions/sprintActions';


const DialogContent = withStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);


function StatisticDialog(props) {

  const stars = Math.round(5 * props.sprintState.score / props.sprintState.scoreAverage)

  return (
    <div>
      <Dialog
       fullWidth={true}
       maxWidth="sm"
       open={props.sprintState.showStatistic}>
        <MuiDialogTitle>Sprint Results</MuiDialogTitle>
        <DialogContent dividers>
          <Typography variant="h2" id="discrete-slider" gutterBottom >
            {props.sprintState.score} points
          </Typography>
          <Typography variant="h5" component="h3">
            Your record: {props.sprintState.scoreRecord} points
          </Typography>
          <DialogContentText>
            Your average result: {props.sprintState.scoreAverage} points
          </DialogContentText>
          <Rating name="game-results" value={stars} readOnly style={{display: 'flex', justifyContent: 'center'}} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.endGame} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
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
