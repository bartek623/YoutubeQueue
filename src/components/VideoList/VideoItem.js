import React, { useContext } from "react";

import { QueueContext } from "../../store/queue-context";

import styles from "./VideoItem.module.css";

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
  let title =
    data.title.length > 48 ? data.title.slice(0, 48) + "..." : data.title;

  // Parse the titles and replace html entities with symbols
  title = new DOMParser().parseFromString(title, "text/html").body.firstChild
    .textContent;

  const channelTitle = new DOMParser().parseFromString(
    data.channelTitle,
    "text/html"
  ).body.firstChild.textContent;
  //

  return (
    <li className={styles.item}>
      {!!data.thumbnails && (
        <img src={data.thumbnails.default.url} alt="video thumbnail"></img>
      )}
      <div>
        <h4>{title}</h4>
        <p>{channelTitle}</p>
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
