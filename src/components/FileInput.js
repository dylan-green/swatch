import React from 'react';
import PropTypes from 'prop-types';
import './FileInput.css';

export default class FileInput extends React.Component {
  render() {
    const theme = this.props.theme || 'primary';
    return (
      <div style={{ padding: '.5em' }}>
        <label className={`input input-${theme}`}>
          {this.props.title}
          <input
            style={{ display: 'none' }}
            type='file'
            accept={this.props.accept}
            onChange={this.props.onChange}
          />
        </label>
      </div>
    );
  }
}

FileInput.propTypes = {
  theme: PropTypes.string,
  title: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
