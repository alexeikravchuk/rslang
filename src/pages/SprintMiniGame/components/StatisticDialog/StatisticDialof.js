import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

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

  return (
    <div>
      <Dialog
       fullWidth={true}
       maxWidth="sm"
       open={props.sprintState.showStatistic}>
        <MuiDialogTitle>Sprint Results</MuiDialogTitle>
        <DialogContent dividers>
          <Typography variant="h2" id="discrete-slider" gutterBottom >
            2460 points
          </Typography>
          <Typography variant="h5" component="h3">
            Your record: 3830 points
          </Typography>
          <DialogContentText>
            Your average result: 2800 points
          </DialogContentText>
          <Rating name="game-results" value={4} readOnly style={{display: 'flex', justifyContent: 'center'}} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.loadGame} color="primary">
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StatisticDialog)
