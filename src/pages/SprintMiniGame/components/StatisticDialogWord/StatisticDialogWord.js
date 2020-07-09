import React from 'react';
import {
  IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Check, VolumeDown } from '@material-ui/icons';
import { MEDIA_FILES_URL } from '../../constants/constants'

export function StatisticDialogWord ({props}) {

  const MuiAlert = withStyles((theme) => ({
    root: {
      padding: theme.spacing(1),
    },
  }))(Alert);

  const MuiIconButton = withStyles((theme) => ({
    root: {
      padding: theme.spacing(0),
    },
  }))(IconButton);

  const { word, type } = props

  const audioExample = (url) => {
    const audio = new Audio(`${MEDIA_FILES_URL}${url}`)
    audio.play()
  }

  return (
    <MuiAlert icon={type ? <Check fontSize="inherit" /> : null} severity={type ? "success" : "error"}>
      <MuiIconButton onClick={() => {audioExample(word.audio)}}>
        <VolumeDown/>
      </MuiIconButton>
      <span> {word.word}   {word.transcription}   {word.wordTranslate}</span>
    </MuiAlert>
  );
}
