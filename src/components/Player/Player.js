import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

import styles from "./Player.module.css";

function Player() {
  const [videoId, setVideoId] = useState("akfkl6nJuzo");
  const [playerHeight, setPlayerHeight] = useState(0);
  const playerRef = useRef();

  useEffect(() => {
    setPlayerHeight((playerRef.current.offsetWidth * 9) / 16);
  }, []);

  const opts = {
    height: playerHeight,
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className={styles.player} ref={playerRef}>
      {videoId && <YouTube videoId={videoId} opts={opts}></YouTube>}
      {!videoId && <div>no video</div>}
    </div>
  );
}

export default Player;
