import React, { useReducer } from "react";

const videosInitialState = {
  queue: [],
  history: [],
};

export const QueueContext = React.createContext({
  videos: videosInitialState,
  onQueueAdd: () => {},
  onQueueRemove: () => {},
  onHistoryAdd: () => {},
});

const videosReducer = function (state, action) {
  const { type, payload } = action;
  switch (type) {
    case "queueAdd":
      if (state.queue.includes(payload)) return state;

      return {
        ...state,
        queue: [...state.queue, payload],
      };

    case "queueRemove":
      return {
        ...state,
        queue: state.queue.filter((id) => id !== payload),
      };

    case "historyAdd":
      return {
        ...state,
        history: [payload, ...state.history.filter((id) => id !== payload)],
      };

    default:
      return state;
  }
};

export function QueueContextProvider(props) {
  const [videos, dispatch] = useReducer(videosReducer, videosInitialState);

  const onQueueAdd = function (id) {
    dispatch({ type: "queueAdd", payload: id });
  };

  const onQueueRemove = function (id) {
    dispatch({ type: "queueRemove", payload: id });
  };

  const onHistoryAdd = function (id) {
    dispatch({ type: "historyAdd", payload: id });
  };

  return (
    <QueueContext.Provider
      value={{
        videos,
        onQueueAdd,
        onQueueRemove,
        onHistoryAdd,
      }}
    >
      {props.children}
    </QueueContext.Provider>
  );
}
