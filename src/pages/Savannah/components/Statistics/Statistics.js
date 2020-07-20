import React from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  List,
} from '@material-ui/core';
import {gameReset} from '../../../../store/actions/savannahAction';

function Statistics({learnedWords, missedWords, onReset}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onReset();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Typography align={'center'} variant='h6' color={'primary'} gutterBottom>
          Learned words:
        </Typography>
        <Divider/>
        <DialogContent>
          <List dense={true}>
            {learnedWords.map((el) => {
              return (
                <ListItem key={el.id}>
                  <ListItemText
                    primary={`${el.word} - ${el.transcription} - ${el.wordTranslate}`}
                  />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <Divider/>
        <Typography align={'center'} variant='h6' color={'secondary'} gutterBottom>
          Missed words:
        </Typography>
        <Divider/>
        <DialogContent>
          <List dense={true}>
            {missedWords.map((el) => {
              return (
                <ListItem key={el.id}>
                  <ListItemText
                    primary={`${el.word} - ${el.transcription} - ${el.wordTranslate}`}
                  />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='primary' onClick={handleClose}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = store => {
  const {savannahReducer} = store;
  return {...savannahReducer};
};

const mapDispatchToProps = dispatch => ({
  onReset: () => {
    dispatch(gameReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
