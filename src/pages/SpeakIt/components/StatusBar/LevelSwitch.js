import React, { Component } from 'react';
import clsx from 'clsx';

class LevelSwitch extends Component {
  render() {
    return (
      <ul className='points'>
        {new Array(this.props.level.maxLevel).fill(1).map((point, i) => (
          <li
            className={clsx('point', {
              'point-active': i === this.props.level.current - 1,
            })}
            key={'level-' + (i + 1)}>
            {i + 1}
          </li>
        ))}
      </ul>
    );
  }
}

export default LevelSwitch;
