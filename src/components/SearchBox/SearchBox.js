import { useRef } from "react";
import useFetch from "../../hooks/useFetch";

import styles from "./SearchBox.module.css";

function SearchBox(props) {
  const inputRef = useRef();
  const { isLoading, error, getVideoInfo } = useFetch();
  const showError = error && inputRef.current.value === "";

  const submitHandler = function (e) {
    e.preventDefault();

    const link = inputRef.current.value;

    if (link === "") return;

    let code;

    if (link.includes("youtube")) {
      code = link?.split("=")[1]?.split("&")[0];
    } else if (link.includes("youtu.be")) {
      code = link.split("/").at(-1);
    } else {
      code = link;
    }

    if (!code) return;

    getVideoInfo(code, props.onSubmit, code === link);
    inputRef.current.value = "";
  };

  return (
    <div className={styles["search-box"]}>
      <h2 className={styles.heading}>Add video to queue</h2>

      <form className={styles.form} onSubmit={submitHandler}>
        <input
          type="text"
          ref={inputRef}
          className={`${styles.input} ${showError && styles.error}`}
          placeholder="Type full link to youtube video or video title (or keyword)"
        ></input>
        <button type="submit">Add to queue</button>
      </form>
      {showError && <p className={styles["error-mess"]}>{error}</p>}
      {isLoading && <div className={styles["loading-box"]}></div>}
    </div>
  );
}

export default SearchBox;
