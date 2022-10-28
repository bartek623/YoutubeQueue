import SearchBox from "../SearchBox/SearchBox";
import VideoList from "../VideoList/VideoList";
import Player from "../Player/Player";
import styles from "./Homepage.module.css";
import { useState } from "react";

function Homepage() {
  const [currentVideo, setCurrentVideo] = useState("");
  const [queue, setQueue] = useState([]);

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

  const removeFromQueue = function (videoId) {
    setQueue((prev) => prev.filter((el) => el !== videoId));
  };

  const changeVideoOnPlayer = function (videoId = "") {
    if (queue.length === 0) {
      setCurrentVideo(videoId);
      return;
    }

    setCurrentVideo(queue[0]);
    removeFromQueue(queue[0]);
  };

  return (
    <>
      <header className={styles["main-header"]}>
        <h1>Your YouTube Queue</h1>
      </header>
      <main className={styles.main}>
        <Player currVideo={currentVideo} onEnd={changeVideoOnPlayer}></Player>
        <aside>
          <SearchBox onSubmit={addToQueue}></SearchBox>
          <VideoList videos={queue} onRemove={removeFromQueue}></VideoList>
        </aside>
      </main>
    </>
  );
}

export default Homepage;
