import React from 'react';
import Button from '@material-ui/core/Button';
import {
  ContactSupport,
  CheckCircleOutline,
  Forward,
  InsertChart,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const buttons = [
  { title: "I don't know", icon: <ContactSupport /> },
  { title: 'Check', icon: <CheckCircleOutline /> },
  { title: 'Continue', icon: <Forward /> },
  { title: 'Results', icon: <InsertChart /> },
];

const Buttons = () => {
  const classes = useStyles();
  return (
    <div>
      {buttons.map((button, i) => (
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          endIcon={button.icon}
          key={i}>
          {button.title}
        </Button>
      ))}
    </div>
  );
};

export default Buttons;
