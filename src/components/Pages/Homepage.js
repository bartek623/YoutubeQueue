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
      let data = videoData;

      if (queue.length > 0) {
        data = queue[0];
        onQueueRemove(data.id);
      }

      if (!data) {
        document.title = "YoutubeQueue";
        setCurrentVideo("");
        return;
      }

      onHistoryAdd(data);
      setCurrentVideo(data.id);
      document.title = data.title;
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
