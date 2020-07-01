import React from 'react';
import {
  Typography,
  DialogContent,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { StatisticDialogWord } from '../StatisticDialogWord/StatisticDialogWord';

export function StatisticDialogWords (props) {

const styles = {
  wordsContainer: {
    boxSizing: 'border-box',
    height: '200px',
    overflowY: 'auto',
  },
  dialogBody: {
    height: '400px',
  }
}

  const { learnedWords, wrongWords, gameWords } = props.props.sprintState
  return (
    <div style={styles.dialogBody}>
      <DialogContent dividers style={styles.wordsContainer}>
        <Typography variant="subtitle2">Learned words:</Typography>
        {Array.from(learnedWords).map((index) => {
          const word = gameWords[index]
          return (
            <StatisticDialogWord props={{word, type: true}} key={word.id}/>
          )})}
      </DialogContent>
      <DialogContent dividers style={styles.wordsContainer}>
        <Typography variant="subtitle2">Errors:</Typography>
        {Array.from(wrongWords).map((index) => {
          const word = gameWords[index]
          return (
            <StatisticDialogWord props={{word, type: false}} key={word.id}/>
          )})}
      </DialogContent>
    </div>
  );
}
