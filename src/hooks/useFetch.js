import { useCallback, useState } from "react";
const key = "AIzaSyAFvRV7AJVYM520rj6-r95VsVOihc2P1eY";

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getVideoInfo = useCallback(async function (
    videoId,
    dataFn,
    searchByKeyword = false
  ) {
    setIsLoading(true);
    setError("");
    try {
      let res;
      if (searchByKeyword) {
        res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${videoId}&key=${key}`
        );
      } else {
        res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${key}`
        );
      }

      if (!res.ok) {
        const data = {
          title: "Video info cannot be fetched",
          channelTitle: videoId,
        };

        dataFn(data);
        throw new Error(
          `Something went wrong (${res.status}) 💥
          The video cannot be fetch`
        );
      }

      const data = await res.json();
      const id = data.items[0].id.videoId
        ? data.items[0].id.videoId
        : data.items[0].id;

      const dataTranformed = {
        ...data.items[0].snippet,
        id,
      };

      dataFn(dataTranformed);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
    setIsLoading(false);
  },
  []);

  return { isLoading, error, getVideoInfo };
}

export default useFetch;
