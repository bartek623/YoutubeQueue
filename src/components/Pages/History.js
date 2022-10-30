import { useContext } from "react";
import { QueueContext } from "../../store/queue-context";
import VideoItem from "../VideoList/VideoItem";
import styles from "./History.module.css";

function History() {
  const { history } = useContext(QueueContext).videos;

  const items = history.map((video, i) => (
    <VideoItem id={video} key={i + video} parent={"History"}></VideoItem>
  ));

  return <main className={styles.main}>{items}</main>;
}

export default History;
