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
      console.log(data);

      if (
        !data.items[0].kind.includes("video") &&
        !data.items[0].id?.kind.includes("video")
      ) {
        throw new Error("It is not a video!");
      }

      const id = data.items[0].id.videoId
        ? data.items[0].id.videoId
        : data.items[0].id;

      const title = new DOMParser().parseFromString(
        data.items[0].snippet.title,
        "text/html"
      ).body.firstChild.textContent;

      const channelTitle = new DOMParser().parseFromString(
        data.items[0].snippet.channelTitle,
        "text/html"
      ).body.firstChild.textContent;

      const dataTranformed = {
        id,
        title,
        channelTitle,
        thumbnails: data.items[0].snippet.thumbnails,
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
