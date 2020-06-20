import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  score: {
    marginBottom: '2rem',
  },
}));

export function Score() {
  const classes = useStyles();

  return (
    <div className={classes.score}>
      <Typography variant="h4" component="h4">
        0
      </Typography>
    </div>
  );
}
