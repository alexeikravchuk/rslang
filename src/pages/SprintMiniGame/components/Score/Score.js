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
    marginBottom: '1rem',
  },
}));

function Score(props) {
  const classes = useStyles();
  return (
    <div className={classes.score}>
      <Typography variant="h4" component="h4">
        {props.sprintState.score}
      </Typography>
      <Typography variant="h6" component="h6" style={{textAlign: 'center'}}>
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
