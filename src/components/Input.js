import React from 'react';

import './Input.css';

export default class Input extends React.Component {
  render() {
    return (
      <div style={{ padding: '.5em' }}>
        <label class='input'>
          {this.props.title}
          <input
            style={{ display: 'none' }}
            type='file'
            onChange={this.props.onChange}
          />
        </label>
        <footer>
          <cite style={{ fontSize: '8px' }}>{this.props.file}</cite>
        </footer>
      </div>
    );
  }
}
