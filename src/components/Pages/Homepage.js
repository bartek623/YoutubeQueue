import SearchBox from "../SearchBox/SearchBox";
import VideoList from "../VideoList/VideoList";
import Player from "../Player/Player";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <>
      <header className={styles["main-header"]}>
        <h1>Your YouTube Queue</h1>
      </header>
      <main className={styles.main}>
        <Player></Player>
        <aside>
          <SearchBox></SearchBox>
          <VideoList></VideoList>
        </aside>
      </main>
    </>
  );
}

export default Homepage;
