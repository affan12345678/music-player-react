import "./index.css";
import Song from "./Song";
import { React, useState } from "react";

function App() {
  const music_player_label = document.querySelector("#music-player-label");
  const music_input = document.querySelector("#music-input");
  const music_player_output = document.querySelector("#music-player-output");
  const songname = document.querySelector("#songname");
  const audio = document.querySelector("#audio");

  const [audioUrl, setAudioUrl] = useState("");

  function handlefileinput(e) {
    if (!e.target.files.length) return;

    setAudioUrl(URL.createObjectURL(e.target.files[0]));
    audio.addEventListener("load", () => {
      URL.revokeObjectURL(audioUrl);
    });
    audio.src = audioUrl;
    audio.controls = "true";
    // console.log(e.target.files[0].name)
    songname.innerText = `${e.target.files[0].name}`;
  }

  function handleDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
  
    const fileList = [e.dataTransfer.files];
  
    console.log(fileList);

    setAudioUrl(URL.createObjectURL(fileList[0]))
  
    // audio.addEventListener("load", () => {
    //   URL.revokeObjectURL(audioUrl);
    // });
  
    audio.src = audioUrl;
    audio.controls = "true";
    songname.innerText = `${fileList[0].name}`;
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
          <span>Drag and drop or select a song to play</span>
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
          {() => {
            return <Song />;
          }}
        </div>
      </div>
    </>
  );
}

export default App;
