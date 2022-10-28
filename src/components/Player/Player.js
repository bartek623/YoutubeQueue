import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

import styles from "./Player.module.css";

function Player(props) {
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

  const errorHandler = function (e) {
    props.onEnd();
  };

  return (
    <div className={styles.player} ref={playerRef}>
      {props.currVideo && (
        <YouTube
          videoId={props.currVideo}
          opts={opts}
          onEnd={props.onEnd}
          onError={errorHandler}
        ></YouTube>
      )}
      {!props.currVideo && <p>There is no video yet. Add some to the queue!</p>}
    </div>
  );
}

export default Player;
