import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {difficultyChange} from '../../../../store/actions/savannahAction';
import {connect} from 'react-redux';

const styles = {
  gameSliderRoot: {
    width: '250px',
    marginBottom: '1rem',
    color: "#662246",
  },
  sliderLabel: {
    color: "#662246",
    textAlign: 'center',
    marginBottom: '1rem'
  },
};

const marks = [
  {
    value: 0,
    label: '1',
  },
  {
    value: 1,
    label: '2',
  },
  {
    value: 2,
    label: '3',
  },
  {
    value: 3,
    label: '4',
  },
  {
    value: 4,
    label: '5',
  },
  {
    value: 5,
    label: '6',
  },
];

function valuetext(value) {
  return `${value}`;
}

function GameSlider(props){
  const {classes, difficulty, onChange} = props;
    return (
      <div className={classes.gameSliderRoot}>
        <Slider
          onChange={(e, val) => onChange(val)}
          value = {difficulty}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider'
          step={1}
          marks={marks}
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
