import VideoItem from "./VideoItem";

import styles from "./VideoList.module.css";

function VideoList(props) {
  const items = props.videos.map((video) => (
    <VideoItem
      key={Date.now() * Math.random()}
      id={video}
      onRemove={props.onRemove}
    ></VideoItem>
  ));
  return <ul className={styles.list}>{items}</ul>;
}

export default VideoList;
