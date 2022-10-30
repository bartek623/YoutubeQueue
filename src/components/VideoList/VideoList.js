import React, { useContext } from "react";
import { QueueContext } from "../../store/queue-context";
import VideoItem from "./VideoItem";

import styles from "./VideoList.module.css";

function VideoList() {
  const { queue } = useContext(QueueContext).videos;

  const items = queue.map((video, i) => (
    <VideoItem key={i + video} id={video} parent={"VideoList"}></VideoItem>
  ));
  return <ul className={styles.list}>{items}</ul>;
}

export default React.memo(VideoList);
