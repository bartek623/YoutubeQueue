import styles from "./SearchBox.module.css";

function SearchBox() {
  return (
    <div className={styles["search-box"]}>
      <h2 className={styles.heading}>Add video to queue</h2>
      <form className={styles.form}>
        <input type="text"></input>
        <button type="submit">Add to queue</button>
      </form>
    </div>
  );
}

export default SearchBox;
