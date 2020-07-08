import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, DialogContentText } from '@material-ui/core';

class AboutGame extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      instruction: false,
    }
    this.runInstructions = this.runInstructions.bind(this);
    this.closeInstructions = this.closeInstructions.bind(this);
  }

  runInstructions(){
    this.setState({instruction: true})
  }

  closeInstructions(){
    this.setState({instruction: false})
  }

  render(){
  return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.runInstructions}>
          About Game
        </Button>
          <Dialog
            open={this.state.instruction}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.closeInstructions}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"How to play?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Listen closely and choose suited translation. You can listen one more time by clicking on "ear-sound" image.  
              </DialogContentText>
              <DialogContentText>
                By the way, you can select answer with keyboard by pressing "1", "2", "3", "4", "5". 
              </DialogContentText>
              <DialogContentText>
                To skip or go to next round press enter key.
              </DialogContentText>
              <DialogContentText>
                Good luck! 
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeInstructions} color="primary">
                Understand
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default (AboutGame);
