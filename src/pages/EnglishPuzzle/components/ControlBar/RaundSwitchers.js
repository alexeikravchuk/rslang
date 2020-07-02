import React, { useContext } from 'react';
import SelectSwitcher from './SelectSwitcher';
import { ControlBarContext } from '../context';

const RaundSwitchers = () => {
  const { level, page, changeLevel, changePage } = useContext(ControlBarContext);

  return (
    <form className='control--raunds'>
      <SelectSwitcher
        name='level'
        value={level.current}
        maxValue={level.maxLevel}
        changeValue={changeLevel}
      />
      <SelectSwitcher
        name='page'
        value={page.current}
        maxValue={page.maxPage}
        changeValue={changePage}
      />
    </form>
  );
};

export default RaundSwitchers;
