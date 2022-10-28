import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

import styles from "./VideoItem.module.css";

function VideoItem(props) {
  const { isLoading, error, getVideoInfo } = useFetch();
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    getVideoInfo(props.id, setVideoInfo);
  }, [getVideoInfo]);

  if (!videoInfo) return;

  const title =
    videoInfo.title.length > 48
      ? videoInfo.title.slice(0, 48) + "..."
      : videoInfo.title;

  return (
    <li className={styles.item}>
      <img src={videoInfo.thumbnails.default.url}></img>
      <div>
        <h4>{title}</h4>
        <p>
          {isLoading && "loading"}
          {!isLoading && videoInfo.channelTitle}
        </p>
      </div>
    </li>
  );
}

export default VideoItem;
