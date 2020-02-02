import React from 'react';
import FileInput from './components/FileInput';
import Button from './components/Button';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      image: null,
      avgHex: null,
      avgRGB: null
    };
  }

  fileSelectHandler = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  };

  fileUploadHandler = () => {
    if (!this.state.file) {
      alert('Please select an image');
    }
    const img = new Image();
    img.src = this.state.file;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = (canvas.width = img.naturalWidth);
      const height = (canvas.height = img.naturalHeight);

      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, width, height).data;
      const length = data.length;

      let r = 0,
        g = 0,
        b = 0,
        p = 0;

      for (let i = 0; i < length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        p++;
      }

      r = Math.floor(r / p);
      g = Math.floor(g / p);
      b = Math.floor(b / p);

      const hex = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
      this.setState({
        image: this.state.file,
        avgHex: hex,
        avgRGB: `rgb(${r},${g},${b})`
      });
    };
  };

  render() {
    return (
      <div className='App'>
        <header
          className='App-header'
          style={{
            backgroundImage: `radial-gradient(circle, ${this.state.avgHex}, white)`
          }}>
          <section>
            <p>Upload an image to determine the average color value.</p>
            <div className='btn-container'>
              <FileInput
                title='Browse'
                onChange={this.fileSelectHandler}
                accept='image/*'
              />
              <Button
                color='primary'
                title='Upload'
                onClick={this.fileUploadHandler}
              />
            </div>
            <footer>
              <cite style={{ fontSize: '8px' }}>{this.state.file}</cite>
            </footer>
          </section>
          <section style={{ padding: '2em' }}>
            <img
              style={{
                maxWidth: '40%',
                maxHeight: '40%',
                borderRadius: '50%'
              }}
              alt=''
              src={this.state.image}></img>
          </section>
          {this.state.avgHex && (
            <div>
              <ColorDisplay
                hexVal={this.state.avgHex}
                rgbVal={this.state.avgRGB}
              />
            </div>
          )}
        </header>
      </div>
    );
  }
}

class ColorDisplay extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'left' }}>
        <p>
          The average hex value is <code>{this.props.hexVal}</code>
        </p>
        <p>
          The average rgb value is <code>{this.props.rgbVal}</code>
        </p>
      </div>
    );
  }
}

export default App;
