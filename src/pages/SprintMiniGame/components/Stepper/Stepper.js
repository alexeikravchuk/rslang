import React from 'react';
import { connect } from 'react-redux';
import './Stepper.scss'

const stepperLength = [1, 2, 3]

function Stepper({sprintState}) {
  console.log(sprintState.xpLevelStepper)
  return (
    <div className='stepper'>
      {
        stepperLength.map((step, i) => {
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
