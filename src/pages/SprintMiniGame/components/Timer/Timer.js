import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { isTimerFinished } from '../../../../store/actions/sprintActions';
import { TIMER_VALUE } from '../../constants/constants';

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

function Timer(props) {
  const classes = useStyles();

  const timerState = {
    timerProgress: 0,
    timerValue: 60,
  }
  const [progress, setProgress] = React.useState(timerState.timerProgress);
  const [timerValue, setTimer] = React.useState(timerState.timerValue);
  const fullProgress = 99;
  const progressPerSecond = 1.666666666666667;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= fullProgress ? 0 : prevProgress + progressPerSecond));
      setTimer((prevValue) => (prevValue === 0 ? TIMER_VALUE : prevValue - 1));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (timerValue <= 58) {
    props.isTimerFinished()
  }

   return (
    <div className={classes.timer}>
      <CircularProgress variant="static" value={progress} thickness={ 5 } size={ 100 } />
      <Typography variant="h4" component="h4" className={classes.timerValue}>
        {timerValue}
      </Typography>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    sprintState: state.sprintReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isTimerFinished: () => dispatch(isTimerFinished())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
