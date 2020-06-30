import React, { Component } from 'react';
import SelectSwitcher from './SelectSwitcher';
import { MAX_LEVEL } from '../../constants/constants';

class RaundSwitchers extends Component {
  state = {
    level: 1,
    page: 1,
  };
  handleChange = (event) => {
    this.setState(event.target.value);
  };
  render() {
    const { level, page } = this.state;
    return (
      <form className='control--raunds'>
        <SelectSwitcher name='level' value={level} maxValue={MAX_LEVEL} />
        <SelectSwitcher name='page' value={page} maxValue={30} />
      </form>
    );
  }
}

export default RaundSwitchers;
