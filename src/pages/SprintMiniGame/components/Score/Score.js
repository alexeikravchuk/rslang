import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  score: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
}));

function Score(props) {
  const classes = useStyles();
  return (
    <div className={classes.score}>
      <Typography variant="h2" component="h2">
        {props.sprintState.score}
      </Typography>
      <Typography variant="h4" component="h4" style={{textAlign: 'center'}}>
        +{props.sprintState.xp * props.sprintState.xpLevel} points per word
      </Typography>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    sprintState: state.sprintReducer
  }
}

export default connect(mapStateToProps, null)(Score)
