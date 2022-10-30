import { useCallback, useContext, useEffect, useState } from "react";

import SearchBox from "../SearchBox/SearchBox";
import VideoList from "../VideoList/VideoList";
import Player from "../Player/Player";
import styles from "./Homepage.module.css";

import { QueueContext } from "../../store/queue-context";

function Homepage() {
  const [currentVideo, setCurrentVideo] = useState("");
  const { videos, onQueueRemove, onQueueAdd, onHistoryAdd } =
    useContext(QueueContext);

  const { queue } = videos;

  const addToQueue = function (videoId) {
    if (videos.queue.length === 0 && !currentVideo) {
      changeVideoOnPlayer(videoId);
      return;
    }

    onQueueAdd(videoId);
  };

  const changeVideoOnPlayer = useCallback(
    (videoId = "") => {
      if (queue.length === 0) {
        onHistoryAdd(videoId);
        setCurrentVideo(videoId);
        return;
      }

      onHistoryAdd(queue[0]);
      setCurrentVideo(queue[0]);
      onQueueRemove(queue[0]);
    },
    [onHistoryAdd, onQueueRemove, queue]
  );

  useEffect(() => {
    if (queue.length > 0 && !currentVideo) {
      changeVideoOnPlayer();
    }
  }, [changeVideoOnPlayer, queue, currentVideo]);

  return (
    <main className={styles.main}>
      <Player currVideo={currentVideo} onEnd={changeVideoOnPlayer}></Player>
      <aside>
        <SearchBox onSubmit={addToQueue}></SearchBox>
        <VideoList></VideoList>
      </aside>
    </main>
  );
}

export default Homepage;
