import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default class Button extends React.Component {
  render() {
    const disabled = this.props.disabled;
    const theme = disabled ? 'disabled' : this.props.theme || 'primary';
    return (
      <div style={{ padding: '.5em' }}>
        <button
          className={`button button-${theme}`}
          onClick={!disabled && this.props.onClick}>
          {this.props.title}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  disabled: PropTypes.bool,
  theme: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
