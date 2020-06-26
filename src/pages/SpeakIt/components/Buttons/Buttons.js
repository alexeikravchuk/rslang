import React from 'react';
import PropTypes from 'prop-types';

const Buttons = ({ classes, onButtonClick, btns }) => {
  return (
    <div className={'btns ' + (classes ? classes : '')}>
      {btns.map((btn, i) => (
        <button
          className={'btn ' + btn.classes}
          onClick={onButtonClick}
          key={'button' + i}>
          {btn.title}
        </button>
      ))}
    </div>
  );
};

Buttons.propTypes = {
  classes: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  btns: PropTypes.array.isRequired,
};

Buttons.defaultProps = {
  classes: '',
}

export default Buttons;
