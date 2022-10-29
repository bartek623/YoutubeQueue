import React from "react";
import VideoItem from "./VideoItem";

import styles from "./VideoList.module.css";

function VideoList(props) {
  const items = props.videos.map((video, i) => (
    <VideoItem key={i + video} id={video} onRemove={props.onRemove}></VideoItem>
  ));
  return <ul className={styles.list}>{items}</ul>;
}

export default React.memo(VideoList);
