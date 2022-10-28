import { useCallback, useState } from "react";
const key = "AIzaSyAFvRV7AJVYM520rj6-r95VsVOihc2P1eY";

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getVideoInfo = useCallback(async function (videoId, dataFn) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${key}`
      );

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();
      dataFn(data.items[0].snippet);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }, []);

  return { isLoading, error, getVideoInfo };
}

export default useFetch;
