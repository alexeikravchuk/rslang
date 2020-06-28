import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {difficultyChange} from "../../../../store/actions/savannahAction";
import {connect} from "react-redux";

const styles = {
  root: {
    width: 300,
    marginBottom: '2rem',

    color: "#662246",
  },
  sliderLabel: {
    color: "#662246",
    textAlign: 'center',
    marginBottom: '1rem'
  },
};

function valuetext(value) {
  return `${value}`;
}

function GameSlider(props){
  const {classes} = props;
    return (
      <div className={classes.root}>
        <Typography id="discrete-slider" gutterBottom className={classes.sliderLabel}>
          Choose your skill:
        </Typography>
        <Slider
          onChangeCommitted={(e, val) => props.onChange(val)}
          value = {props.difficulty}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={5}
        />
      </div>
    );
}

const mapStateToProps = store => {
  const { savannahReducer } = store
  return { ...savannahReducer }
}

const mapDispatchToProps = dispatch => ({
  onChange: (sliderValue) => {
    dispatch(difficultyChange(sliderValue))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameSlider))