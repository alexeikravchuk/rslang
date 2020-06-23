import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import {gameReset} from "../../../../store/actions/savannahAction";


function Statistics(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false)
    props.onReset();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Your statistic:"}</DialogTitle>
        <DialogTitle id="alert-dialog-title">{"Learned words:"}</DialogTitle>
        <DialogTitle id="alert-dialog-title">{"Missed words:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Each small step brings closer to your goal...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}  >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}

const mapStateToProps = store => {
  const { savannahReducer } = store
  return { ...savannahReducer }
}

const mapDispatchToProps = dispatch => ({
  onReset: () => {
    dispatch(gameReset())
  }
})



export default connect(mapStateToProps, mapDispatchToProps)(Statistics);