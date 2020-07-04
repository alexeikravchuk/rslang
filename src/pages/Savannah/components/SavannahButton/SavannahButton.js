import React from 'react';
import {makeStyles, Button} from '@material-ui/core';

const useStyles = makeStyles((theme)=> ({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(106, 35, 72, .3)',
    color: 'wheat',
    height: 48,
    width: 200,
    margin: theme.spacing(1),
  },
}));

export default ({onClick, keyId, disabled, title}) => {
  const classes = useStyles();
  return (
      <Button key={keyId} variant={'outlined'} className={classes.button}
        onClick={onClick}
        disabled={disabled}>
        {title}
      </Button>
    )
}
