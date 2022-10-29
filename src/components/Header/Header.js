import styles from "./Header.module.css";

function Header(props) {
  const showQueue = function (e) {
    e.preventDefault();
    props.showQueue();
  };

  const showHistory = function (e) {
    e.preventDefault();
    props.showHistory();
  };

  return (
    <header className={styles["main-header"]}>
      <h1>Your YouTube Queue</h1>
      <nav className={styles["main-nav"]}>
        <ul>
          <li>
            <a href="queue" onClick={showQueue}>
              Queue
            </a>
          </li>
          <li>
            <a href="history" onClick={showHistory}>
              History
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
