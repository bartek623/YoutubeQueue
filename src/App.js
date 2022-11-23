import { useState } from "react";

import { QueueContextProvider } from "./store/queue-context";
import Header from "./components/Header/Header";
import History from "./components/Pages/History";
import Homepage from "./components/Pages/Homepage";

function App() {
  const [page, setPage] = useState("queue");

  const showHistory = function () {
    setPage("history");
  };

  const showQueue = function () {
    setPage("queue");
  };

  // Also could be done with react router but here it is unnecessary
  return (
    <>
      <Header showQueue={showQueue} showHistory={showHistory}></Header>
      <QueueContextProvider>
        {page === "queue" && <Homepage></Homepage>}
        {page === "history" && <History></History>}
      </QueueContextProvider>
    </>
  );
}

export default App;
