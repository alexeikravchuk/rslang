import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {
  Button,
  Dialog,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Loader } from '../Loader/Loader'
import { userWords, changeDifficulty, loadGame, changeRound } from '../../../../store/actions/sprintActions';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

const Avatar = withStyles((theme) => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: theme.spacing(2),
  },
}))(MuiAvatar);


function WelcomeDialog(props) {

  if (props.sprintState.gameLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <Dialog
       fullWidth={true}
       maxWidth="sm"
       open={props.sprintState.open}>
        <MuiDialogTitle>
          <Avatar alt="logo" src={`${process.env.PUBLIC_URL}/images/logo.png`} />
          RS Sprint
        </MuiDialogTitle>
        <DialogContent dividers>
          <Typography variant="h5" id="discrete-slider" gutterBottom style={{marginBottom: '2.35em'}}>
            Choose your difficulty level, please
          </Typography>
          <Slider
            defaultValue={props.sprintState.difficulty}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={6}
            disabled={props.sprintState.disabled}
            onChange={(event, value) => props.changeDifficulty(value)}
          />
          <Typography variant="h5" id="discrete-slider" gutterBottom style={{marginBottom: '2.35em'}}>
            Choose round, please
          </Typography>
          <Slider
            defaultValue={props.sprintState.round}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={30}
            disabled={props.sprintState.disabled}
            onChange={(event, value) => props.changeRound(value)}
          />
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            control={<Checkbox checked={props.sprintState.checked} onChange={props.handleChange} />}
            label="Use my dictionary"
          />
          <Button autoFocus onClick={() => {props.loadGame(props.sprintState.difficulty, props.sprintState.round)}} color="primary">
            Start game!
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
    handleChange: () => dispatch(userWords()),
    changeDifficulty: (value) => dispatch(changeDifficulty(value)),
    changeRound: (value) => dispatch(changeRound(value)),
    loadGame: (difficulty, round) => dispatch(loadGame(difficulty, round))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeDialog)
