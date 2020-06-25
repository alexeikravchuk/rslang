import React from 'react';
import { connect } from 'react-redux';
import './Stepper.scss'
import { XP_STEPPER_NUMBER } from '../../constants/constants'

const stepper = new Array(XP_STEPPER_NUMBER);

function Stepper({sprintState}) {
  return (
    <div className='stepper'>
      {
        stepper.fill(' ').map((step, i) => {
          if (i <= sprintState.xpLevelStepper) {
            return <div className='step' style={{backgroundColor: '#1976d2'}} key={i} />
          }
          return <div className='step' key={i} />
        })
      }

    </div>
  )
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


export default connect(mapStateToProps, mapDispatchToProps)(Stepper)
