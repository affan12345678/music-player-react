import { React, useState } from "react";
import "./index.css";

export default function App() {
  const [songname, setSongname] = useState("");
  const [audiosrc, setAudiosrc] = useState("");

  function handlefileinput(e) {
    if (!e.target.files.length) return;
    
    const fileList = e.target.files[0];
    setSongname(fileList.name);
    setAudiosrc(URL.createObjectURL(fileList));
  }

  function handleDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    const fileList = e.dataTransfer.files[0];

    setSongname(fileList.name);
    setAudiosrc(URL.createObjectURL(fileList));
  }

  // function handleTimeUpdate(e) {
  //   let currenttime = e.target.currentTime;
  //   let duration = e.target.duration;
  //   let minutes = Math.floor(currenttime / 60);
  //   let seconds = Math.floor(currenttime - minutes * 60);
  //   // console.log(minutes, seconds);
  // }

  function load(e) {
    console.log(e.target.files[0]);
    URL.revokeObjectURL(e.target.files[0]);
  }

  return (
    <>
      <div id="music-player">
        <label
          id="music-player-label"
          htmlFor="music-input"
          onDragOver={handleDragover}
          onDrop={handleDrop}
        >
          <span>Drop a song here to play</span>
        </label>
        <input
          onChange={handlefileinput}
          hidden
          id="music-input"
          type="file"
          name="music-input"
          accept=".mp3"
        />
        <div id="music-player-output">
          <div className="song">
            <span id="songname" title={songname}>{songname}</span>
            <audio
              src={audiosrc}
              controls
              // onTimeUpdate={handleTimeUpdate}
              onLoad={load}
            ></audio>
          </div>
        </div>
      </div>
    </>
  );
}
