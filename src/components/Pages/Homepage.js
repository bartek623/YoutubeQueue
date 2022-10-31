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

  const addToQueue = function (videoData) {
    if (videos.queue.length === 0 && !currentVideo) {
      changeVideoOnPlayer(videoData);
      return;
    }

    onQueueAdd(videoData);
  };

  const changeVideoOnPlayer = useCallback(
    (videoData = "") => {
      if (queue.length === 0) {
        onHistoryAdd(videoData);
        setCurrentVideo(videoData.id);
        return;
      }

      onHistoryAdd(queue[0]);
      setCurrentVideo(queue[0].id);
      onQueueRemove(queue[0].id);
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
