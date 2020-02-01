import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    file: null,
    image: null,
    avgColor: null
  };

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

      const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
      this.setState({ image: this.state.file, avgColor: color });
    };
  };

  render() {
    return (
      <div className='App'>
        <header
          className='App-header'
          style={{
            backgroundImage: `radial-gradient(circle, ${this.state.avgColor}, white)`
          }}>
          <section>
            <p>Upload an image to see the average color.</p>
            <input type='file' onChange={this.fileSelectHandler}></input>
            <button onClick={this.fileUploadHandler}>Upload</button>
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
          {this.state.avgColor && (
            <section>
              <span>The average color hex value is {this.state.avgColor}</span>
            </section>
          )}
        </header>
      </div>
    );
  }
}

export default App;
