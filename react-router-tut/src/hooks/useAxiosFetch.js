import { useState, useEffect } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3500",
});

const useAxiosFetch = (inputURL, httpMethod = "get", requestData = null) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const config = { "signal": controller.signal };
    if (requestData) config.data = requestData;

    let isMounted = true;

    const fetchData = async (url) => {
      setIsLoading(true);

      try {
        const response = await instance[httpMethod](url, config);
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          let message = null;
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            message = `Server responded. Error: ${error.message}`;
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            message = `No response received from the server. Error: ${error.message}`;
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            message = `Request error: ${error.message}`;
          }
          setFetchError(message);
          setData([]);
        }
      } finally {
        if (isMounted) {
          // setTimeout(() => setIsLoading(false), 2000);
          setIsLoading(false);
        }
      }
    };

    fetchData(inputURL);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [inputURL, httpMethod, requestData]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
