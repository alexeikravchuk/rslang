import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  score: {
    marginBottom: '2rem',
  },
}));

function Score(props) {
  const classes = useStyles();

  return (
    <div className={classes.score}>
      <Typography variant="h4" component="h4">
        {props.sprintState.score}
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Score)

