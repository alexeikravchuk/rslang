import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { userWords, changeDifficulty, loadGame } from '../../../../store/actions/sprintActions';

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

function WelcomeDialog(props) {

  return (
    <div>
      <Dialog
       fullWidth={true}
       maxWidth="sm"
       open={props.sprintState.open}>
        <MuiDialogTitle>RS Sprint</MuiDialogTitle>
        <DialogContent dividers>
          <Typography variant="h5" id="discrete-slider" gutterBottom style={{marginBottom: '2.35em'}}>
            Choose your difficulty level, please
          </Typography>
          <Slider
            defaultValue={4}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={6}
            disabled={props.sprintState.disabled}
            onChange={(event, value) => props.changeDifficulty(value)}
          />
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            control={<Checkbox checked={props.sprintState.checked} onChange={props.handleChange} />}
            label="Use my dictionary"
          />
          <Button autoFocus onClick={props.loadGame} color="primary">
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
    loadGame: () => dispatch(loadGame())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeDialog)
