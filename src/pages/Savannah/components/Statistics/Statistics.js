import React from 'react';
import {connect} from 'react-redux';
import {Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography} from '@material-ui/core';
import {gameReset} from '../../../../store/actions/savannahAction';

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
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Learned words:'}</DialogTitle>
        <ol>
          {props.learnedWords.map((el) => {
            return (
              <li>
                <Typography color={'primary'} key={el.id} variant='body1' component={'h2'}>
                  {el.word} - {el.transcription} - {el.wordTranslate}
                </Typography>
              </li>
            )
          })}
        </ol>
        <DialogTitle id='alert-dialog-title'>{'Missed words:'}</DialogTitle>
        <ol>
          {props.missedWords.map((el) => {
            return (
              <li>
                <Typography color={'secondary'} key={el.id} variant='body1' component={'h2'}>
                  {el.word} - {el.transcription} - {el.wordTranslate}
                </Typography>
              </li>
            )
          })}
        </ol>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Each small step brings closer to your goal...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='primary' onClick={handleClose}  >
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
