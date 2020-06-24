import React, { Component } from 'react';
import clsx from 'clsx';

class LevelSwitch extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onLevelChange(+e.target.textContent);
  }

  render() {
    return (
      <ul className='points'>
        {new Array(this.props.level.maxLevel).fill(1).map((point, i) => (
          <li
            className={clsx('point', {
              'point-active': i === this.props.level.current - 1,
            })}
            key={'level-' + (i + 1)}
            onClick={this.handleClick}>
            {i + 1}
          </li>
        ))}
      </ul>
    );
  }
}

export default LevelSwitch;
