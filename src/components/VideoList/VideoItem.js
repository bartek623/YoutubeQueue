import React, { useContext } from "react";

import { QueueContext } from "../../store/queue-context";

import styles from "./VideoItem.module.css";

const MAX_TITLE_CHARS = 48;

function VideoItem(props) {
  const { parent, data } = props;
  const { videos, onQueueRemove, onQueueAdd } = useContext(QueueContext);

  const isQueued = videos.queue.some((vidData) => vidData.id === data.id);

  const deleteHandler = function () {
    onQueueRemove(data.id);
  };

  const addHandler = function () {
    onQueueAdd(data);
  };

  if (!data) return;

  // Cut title if it is too long
  const title =
    data.title.length > MAX_TITLE_CHARS
      ? data.title.slice(0, MAX_TITLE_CHARS) + "..."
      : data.title;

  return (
    <li className={styles.item}>
      {data.thumbnails && (
        <img src={data.thumbnails.default.url} alt="video thumbnail"></img>
      )}
      <div>
        <h4>{title}</h4>
        <p>{data.channelTitle}</p>
        {parent !== "History" && (
          <button
            className={`${styles["close-btn"]} ${styles.btn}`}
            onClick={deleteHandler}
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        )}
        {parent === "History" && (
          <button
            className={`${styles["add-btn"]} ${styles.btn}`}
            onClick={addHandler}
          >
            <span className="material-symbols-outlined">
              {isQueued ? "check" : "add"}
            </span>
          </button>
        )}
      </div>
    </li>
  );
}

export default React.memo(VideoItem);
