import React from "react";

import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

import styles from "./VideoItem.module.css";

function VideoItem(props) {
  const { isLoading, getVideoInfo } = useFetch();
  const [videoInfo, setVideoInfo] = useState(null);
  const { id } = props;

  useEffect(() => {
    getVideoInfo(id, setVideoInfo);
  }, [getVideoInfo, id]);

  const deleteHandler = function () {
    props.onRemove(id);
  };

  if (!videoInfo) return;

  const title =
    videoInfo.title.length > 48
      ? videoInfo.title.slice(0, 48) + "..."
      : videoInfo.title;

  if (isLoading) {
    return (
      <li className={styles.item}>
        <div className={styles["loading-box"]}></div>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <img src={videoInfo.thumbnails.default.url} alt="video thumbnail"></img>
      <div>
        <h4>{title}</h4>
        <p>{videoInfo.channelTitle}</p>
        <button className={styles["close-btn"]} onClick={deleteHandler}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </li>
  );
}

export default React.memo(VideoItem);
