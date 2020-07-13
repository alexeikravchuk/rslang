import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { isTimerFinished } from '../../../../store/actions/sprintActions';

const useStyles = makeStyles((theme) => ({
  timer: {
    position: 'relative',
    marginBottom: '0.5rem',
  },
  timerValue: {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    textAlign: 'center',
    lineHeight: '70px',
  }
}));

function Timer(props) {
  const classes = useStyles();

  const [progress, setProgress] = React.useState(0);
  const fullProgress = 100;
  const roundDuration = 60;

  const progressCounter = () => {
    setProgress((prevProgress) => (prevProgress >= fullProgress ? 0 : prevProgress + fullProgress / roundDuration));
  }

  React.useEffect(() => {
    const timer = setTimeout(progressCounter, 1000)
    if (progress >= 100) {
      props.isTimerFinished()
    }
    return () => {
      clearTimeout(timer);
    };
  }, [progress]);


  return (
    <div className={classes.timer}>
      <CircularProgress variant="static" value={progress} thickness={ 5 } size={ 70 } />
      <Typography variant="h5" component="h5" className={classes.timerValue}>
        {Math.round(progress * roundDuration / fullProgress)}
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
