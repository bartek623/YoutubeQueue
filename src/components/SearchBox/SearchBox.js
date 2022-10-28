import { useRef } from "react";

import styles from "./SearchBox.module.css";

function SearchBox(props) {
  const inputRef = useRef();

  const submitHandler = function (e) {
    e.preventDefault();

    const link = inputRef.current.value;

    if (link === "") return;

    const code = link?.split("=")[1]?.split("&")[0];

    if (!code) return;

    props.onSubmit(code);
    inputRef.current.value = "";
  };

  return (
    <div className={styles["search-box"]}>
      <h2 className={styles.heading}>Add video to queue</h2>

      <form className={styles.form} onSubmit={submitHandler}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Type full link to youtube video"
        ></input>
        <button type="submit">Add to queue</button>
      </form>
    </div>
  );
}

export default SearchBox;