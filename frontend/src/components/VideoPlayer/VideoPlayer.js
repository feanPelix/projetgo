import React from 'react';
import ReactPlayer from 'react-player/youtube';
import './VideoPlayer.css';

export function VideoPlayer() {
  return (
    <ReactPlayer
      className="vd-center"
      url="https://www.youtube.com/watch?v=7sDY4m8KNLc"
      width="64rem"
      height="36rem"
      controls
      volume={null}
      muted={true}
      playing={true}
      loop={true}
    />
  );
}

export default VideoPlayer;