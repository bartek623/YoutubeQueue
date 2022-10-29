import { useState } from "react";
import Header from "./components/Header/Header";
import History from "./components/Pages/History";
import Homepage from "./components/Pages/Homepage";

function App() {
  const [page, setPage] = useState("queue");
  const [videoHistory, setVideoHistory] = useState([]);
  const [queue, setQueue] = useState([]);

  const showHistory = function () {
    setPage("history");
  };

  const showQueue = function () {
    setPage("queue");
  };

  const addToHistory = function (videoId) {
    setVideoHistory((prev) => {
      if (prev.includes(videoId))
        return [videoId, prev.filter((id) => id !== videoId)];

      return [videoId, ...prev];
    });
  };

  const removeFromHistory = function (videoId) {
    setVideoHistory((prev) => prev.filter((id) => videoId !== id));
  };

  return (
    <>
      <Header showQueue={showQueue} showHistory={showHistory}></Header>
      {page === "queue" && (
        <Homepage
          addToHistory={addToHistory}
          queue={queue}
          setQueue={setQueue}
        ></Homepage>
      )}
      {page === "history" && (
        <History history={videoHistory} remove={removeFromHistory}></History>
      )}
    </>
  );
}

export default App;
