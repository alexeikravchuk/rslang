import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import {gameReset} from "../../../../store/actions/savannahAction";
import Typography from "@material-ui/core/Typography";
import Background from "../background/Background";


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
        <DialogTitle id="alert-dialog-title">{"Learned words:"}</DialogTitle>
        <ul>
          {props.learnedWords.map((el, index) => {
            return (
              <li>
                <Typography color={'primary'} key={index} variant="body1" component={"h2"}>
                  {el}
                </Typography>
              </li>
            )
          })}
        </ul>
        <DialogTitle id="alert-dialog-title">{"Missed words:"}</DialogTitle>
        <ul>
          {props.missedWords.map((el, index) => {
            return (
              <li>
                <Typography color={'secondary'} key={index} variant="body1" component={"h2"}>
                  {el}
                </Typography>
              </li>
            )
          })}
        </ul>
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