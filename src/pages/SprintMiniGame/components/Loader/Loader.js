import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
}));

export function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" id="discrete-slider" gutterBottom style={{marginBottom: '2.35em'}}>
        Loading...
      </Typography>
      <CircularProgress thickness={ 3.6 } size={ 100 } />
    </div>
  );
}
