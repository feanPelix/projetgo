import React from 'react';
import ReactPlayer from 'react-player/youtube';
import './VideoPlayer.css';

export function VideoPlayer() {
  return (
    <ReactPlayer
      className="vd-center"
      url="https://youtu.be/2PZrOSt770U"
      width="64rem"
      height="42rem"
      controls
      volume={null}
      muted={true}
      playing={true}
      loop={true}
    />
  );
}

export default VideoPlayer;