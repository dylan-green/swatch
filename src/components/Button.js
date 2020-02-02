import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default class Button extends React.Component {
  render() {
    const disabled = this.props.disabled;
    const color = !disabled ? this.props.color || 'primary' : 'disabled';
    return (
      <div style={{ padding: '.5em' }}>
        <button
          className={`button button-${color}`}
          onClick={!disabled && this.props.onClick}>
          {this.props.title}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
