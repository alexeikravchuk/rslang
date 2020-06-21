import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  timer: {
    position: 'relative',
    marginBottom: '2rem',
  },
  timerValue: {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    textAlign: 'center',
    lineHeight: '100px',
  }
}));

export function Timer() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const fullProgress = 99;
  const progressPerSecond = 1.666666666666667;
  const roundDuration = 60;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= fullProgress ? 0 : prevProgress + progressPerSecond));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.timer}>
      <CircularProgress variant="static" value={progress} thickness={ 5 } size={ 100 } />
      <Typography variant="h4" component="h4" className={classes.timerValue}>
        {roundDuration - Math.round(progress/progressPerSecond)}
      </Typography>
    </div>
  );
}
