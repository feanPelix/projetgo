import React from 'react';
import ReactPlayer from 'react-player/youtube';

export function VideoPlayer() {
  return (
    <ReactPlayer
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