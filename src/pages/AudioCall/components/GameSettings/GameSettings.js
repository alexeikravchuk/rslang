import React from 'react';
import { withStyles, } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { marks } from '../../constants/constants';

class GameSettings extends React.Component {

  render(){
    const { classes } = this.props;
  return (
    <div className={classes.root}>
        <Typography id="discrete-slider-always" gutterBottom>
            Choose difficulty level
        </Typography>
        <Slider
          onChange={this.props.сhangeDifficulty}
          onDragStop={this.props.handleDragStop}
          defaultValue={1}
          min={1}
          max={6}
          step={1}
          aria-labelledby="discrete-slider-always"
          marks={marks}
          valueLabelDisplay="auto"
        />
        <Typography id="round-select" gutterBottom>
            Choose round
        </Typography>
        <Slider
          onChange={this.props.сhangeRound}
          onDragStop={this.props.handleDragStop} 
          defaultValue={1}
          min={1}
          max={30}
          step={1}
          marks
          aria-labelledby="discrete-slider-always"
          valueLabelDisplay="auto"
        />
    </div>
  );
  }
}

function createStyles(theme) {
  return {
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  };
}

export default withStyles(createStyles)(GameSettings);
