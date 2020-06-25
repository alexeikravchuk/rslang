import React, { Component } from 'react';

class Buttons extends Component {
  onClickHandler = (e) => {
    this.props.onButtonClick(e);
  };

  render() {
    return (
      <div className={'btns ' + (this.props.classes ? this.props.classes : '')}>
        {this.props.btns.map((btn, i) => (
          <button
            className={'btn ' + btn.classes}
            onClick={this.onClickHandler}
            key={'button' + i}>
            {btn.title}
          </button>
        ))}
      </div>
    );
  }
}

export default Buttons;
