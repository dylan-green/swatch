import React from 'react';
import PropTypes from 'prop-types';
import './FileInput.css';

export default class FileInput extends React.Component {
  render() {
    return (
      <div style={{ padding: '.5em' }}>
        <label className='input'>
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
  title: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
