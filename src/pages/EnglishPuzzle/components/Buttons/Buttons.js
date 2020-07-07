import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: '5px',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Buttons = ({ buttons, onBtnClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.buttons}>
      {buttons.map((button, i) => (
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          endIcon={button.icon}
          onClick={onBtnClick}
          key={i}>
          {button.title}
        </Button>
      ))}
    </div>
  );
};

export default Buttons;
