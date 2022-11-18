import { useContext } from "react";
import { QueueContext } from "../../store/queue-context";
import VideoItem from "../VideoList/VideoItem";
import styles from "./History.module.css";

function History() {
  const { history } = useContext(QueueContext).videos;

  const items = history.map((data, i) => (
    <VideoItem data={data} key={i + data.id} parent={"History"}></VideoItem>
  ));

  return (
    <main className={styles.main}>
      {items}
      {history.length < 1 && <p>History is empty!</p>}
    </main>
  );
}

export default History;
