import { useEffect, useCallback, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Request failed!");
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config?.method === "GET" || !config?.method)) || !config) {
      sendRequest();
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
