import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  DialogContentText,
  Typography,
  DialogContent,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';


const MuiDialogConten = withStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
}))(DialogContent);


export function StatisticDialogDescription(props) {
  const {score, totalScore, scoreRecord, gameCounter} = props.props.sprintState.sprintReducer
  const scoreAverage = Math.round(totalScore / gameCounter)


  const stars = Math.round(5 * score / scoreAverage)

  return (
    <MuiDialogConten>
      <Typography variant="h2" id="discrete-slider" gutterBottom >
        {score} points
      </Typography>
      <Typography variant="h5" component="h3">
        Your record: {scoreRecord} points
      </Typography>
      <DialogContentText>
        Your average result: {scoreAverage} points
      </DialogContentText>
      <Rating name="game-results" value={stars} readOnly style={{display: 'flex', justifyContent: 'center'}} />
    </MuiDialogConten>
  );
}
