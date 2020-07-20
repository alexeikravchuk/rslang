import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

const SelectSwitcher = ({ name, value, maxValue, changeValue }) => {
  return (
    <FormControl className={'control--raunds-' + name}>
      <InputLabel id={name + 's-label'}>{name}</InputLabel>
      <Select
        labelId={name + 's-label'}
        id={name + 's'}
        value={value}
        onChange={changeValue}>
        {new Array(maxValue).fill(0).map((_, i) => (
          <MenuItem value={i + 1} key={name + '-' + i}>
            {i + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectSwitcher;
