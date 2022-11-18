import React, { useReducer } from "react";

const videosInitialState = {
  queue: [],
  history: [],
};

export const QueueContext = React.createContext({
  videos: videosInitialState,
  onQueueAdd: () => {},
  onQueueAddToTop: () => {},
  onQueueRemove: () => {},
  onHistoryAdd: () => {},
});

const videosReducer = function (state, action) {
  const { type, payload } = action;
  switch (type) {
    case "queueAdd":
      if (state.queue.some((data) => data.id === payload.id)) return state;

      return {
        ...state,
        queue: [...state.queue, payload],
      };

    case "queueAddToTop":
      if (state.queue.some((data) => data.id === payload.id)) return state;

      return {
        ...state,
        queue: [payload, ...state.queue],
      };

    case "queueRemove":
      return {
        ...state,
        queue: state.queue.filter((data) => data.id !== payload),
      };

    case "historyAdd":
      return {
        ...state,
        history: [
          payload,
          ...state.history.filter((data) => data.id !== payload.id),
        ],
      };

    default:
      return state;
  }
};

export function QueueContextProvider(props) {
  const [videos, dispatch] = useReducer(videosReducer, videosInitialState);

  const onQueueAdd = function (data) {
    dispatch({ type: "queueAdd", payload: data });
  };
  const onQueueAddToTop = function (data) {
    dispatch({ type: "queueAddToTop", payload: data });
  };

  const onQueueRemove = function (id) {
    dispatch({ type: "queueRemove", payload: id });
  };

  const onHistoryAdd = function (data) {
    dispatch({ type: "historyAdd", payload: data });
  };

  return (
    <QueueContext.Provider
      value={{
        videos,
        onQueueAdd,
        onQueueAddToTop,
        onQueueRemove,
        onHistoryAdd,
      }}
    >
      {props.children}
    </QueueContext.Provider>
  );
}
