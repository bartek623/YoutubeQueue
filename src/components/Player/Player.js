import { useContext, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

import { QueueContext } from "../../store/queue-context";

import styles from "./Player.module.css";

function Player(props) {
  const [playerHeight, setPlayerHeight] = useState(0);
  const playerRef = useRef();
  const { videos, onQueueAddToTop } = useContext(QueueContext);

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

  const skipVideo = function () {
    props.onEnd();
  };

  const isAlreadyInQueue = function (videoId) {
    return (
      videos.queue.some((video) => video.id === videoId) ||
      props.currVideo === videoId
    );
  };

  const prevVideo = function () {
    for (let i = 0; i < videos.history.length; i++) {
      if (isAlreadyInQueue(videos.history[i].id)) continue;

      return i;
    }
    return -1;
  };

  const playPrevVideo = function () {
    onQueueAddToTop(videos.history[prevVideo()]);

    // It could work better if after  adding prev video from history we will skip current but to make it work we should use redux instead context api which is not the case here
  };

  const shouldShowPrevBtn = prevVideo() !== -1;

  return (
    <div className={styles.player} ref={playerRef}>
      {props.currVideo && (
        <YouTube
          videoId={props.currVideo}
          opts={opts}
          onEnd={props.onEnd}
          onError={skipVideo}
        ></YouTube>
      )}
      <div className={styles.control}>
        {shouldShowPrevBtn && (
          <button className={styles.prev} onClick={playPrevVideo}>
            <span className="material-symbols-outlined">skip_previous</span>
          </button>
        )}
        {props.currVideo && (
          <button className={styles.skip} onClick={skipVideo}>
            <span className="material-symbols-outlined">skip_next</span>
          </button>
        )}
      </div>
      {!props.currVideo && <p>There is no video yet. Add some to the queue!</p>}
    </div>
  );
}

export default Player;
