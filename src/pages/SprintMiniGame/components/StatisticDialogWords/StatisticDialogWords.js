import React from 'react';
import {
  Typography,
  DialogContent,
} from '@material-ui/core';
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

  const { learnedWords, wrongWords, gameWords } = props.props.sprintState.sprintReducer
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
