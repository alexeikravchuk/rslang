import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from '@material-ui/core';

export default ({onClick}) => (
  <IconButton edge={'end'} className={'close-button'} color='secondary' aria-label='close' onClick={onClick}>
    <CloseIcon />
  </IconButton>
)
