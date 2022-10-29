import VideoItem from "../VideoList/VideoItem";
import styles from "./History.module.css";

function History(props) {
  const items = props.history.map((video, i) => (
    <VideoItem id={video} key={i + video} onRemove={props.remove}></VideoItem>
  ));

  return <main className={styles.main}>{items}</main>;
}

export default History;
