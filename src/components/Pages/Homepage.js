import SearchBox from "../SearchBox/SearchBox";
import VideoList from "../VideoList/VideoList";
import Player from "../Player/Player";
import styles from "./Homepage.module.css";
import { useCallback, useEffect, useState } from "react";

function Homepage(props) {
  const [currentVideo, setCurrentVideo] = useState("");
  const { queue, setQueue, addToHistory } = props;

  const addToQueue = function (videoId) {
    setQueue((prev) => {
      if (prev.some((id) => id === videoId)) return prev;

      if (prev.length === 0 && !currentVideo) {
        changeVideoOnPlayer(videoId);
        return [];
      }

      return [...prev, videoId];
    });
  };

  const removeFromQueue = useCallback(
    (videoId) => {
      setQueue((prev) => prev.filter((el) => el !== videoId));
    },
    [setQueue]
  );

  const changeVideoOnPlayer = useCallback(
    (videoId = "") => {
      if (queue.length === 0) {
        addToHistory(videoId);
        setCurrentVideo(videoId);
        return;
      }

      addToHistory(queue[0]);
      setCurrentVideo(queue[0]);
      removeFromQueue(queue[0]);
    },
    [addToHistory, removeFromQueue, queue]
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
        <VideoList videos={queue} onRemove={removeFromQueue}></VideoList>
      </aside>
    </main>
  );
}

export default Homepage;
