import { useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const ffmpeg = createFFmpeg({ log: true });
    const transcode = async ({ target: { files } }) => {
      const { name } = files[0];
      await ffmpeg.load();
      ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
      await ffmpeg.run('-i', name,  './main.mp4');
      const data = ffmpeg.FS('readFile', './main.mp4');
      console.log(new Blob([data.buffer]), 'cdc')
      const video = document.getElementById('player');
      video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
      const download = document.getElementById('download');
      download.href =  `${new Blob([data.buffer])}`;
    }
    document
      .getElementById('uploader').addEventListener('change', transcode);
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <video id="player" controls></video>
        <input type="file" id="uploader"></input>
        <a id="download">下载</a>
      </header>
    </div>
  );
}

export default App;
