import React, { Component } from 'react';

class ControlButton extends Component {
  render() {
    const { classes, isActive, iconName, tooltipText } = this.props;
    return (
      <button className={classes + (isActive ? '' : ' disabled')}>
        <i className='material-icons'>{iconName}</i>
        <span className='tooltiptext'>{tooltipText}</span>
      </button>
    );
  }
}

export default ControlButton;
