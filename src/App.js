import React from 'react';
import Dropzone from './Dropzone';
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
            <div style={{ padding: '.75em' }}>
              <p>Upload an image to see the average color.</p>
              <input type='file' onChange={this.fileSelectHandler}></input>
              <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
          </section>
          {!this.state.image && (
            <section>
              <Dropzone
                onDrop={() => {
                  alert('dropped');
                }}
              />
            </section>
          )}
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
            <section style={{ textAlign: 'left' }}>
              <p>The average hex value is {this.state.avgHex}</p>
              <p>The average rgb value is {this.state.avgRGB}</p>
            </section>
          )}
        </header>
      </div>
    );
  }
}

export default App;
