import React, { Component } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

class SelectSwitcher extends Component {
  handleChange = () => {};
  render() {
    const { name, value, maxValue } = this.props;
    return (
      <FormControl className='control--raunds-level'>
        <InputLabel id={name + 's-label'}>{name}</InputLabel>
        <Select
          labelId={name + 's-label'}
          id={name + 's'}
          value={value}
          onChange={this.handleChange}>
          {new Array(maxValue).fill(0).map((_, i) => (
            <MenuItem value={i + 1} key={name + '-' + i}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default SelectSwitcher;
