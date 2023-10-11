import React from "react";

export default function Song({ audioUrl, songname }) {
  return (
    <div className="song">
      <span id="songname"></span>
      <audio src="" id="audio"></audio>
    </div>
  );
}
