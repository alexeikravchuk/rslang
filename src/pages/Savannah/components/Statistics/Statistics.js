import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Statistics() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
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