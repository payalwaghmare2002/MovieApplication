import { useState, useEffect } from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=9c13eed2`;

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data); 
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data); 
        setIsError({ show: false, msg: "" });
      } else {
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      console.log(error);
      setIsError({ show: true, msg: "An error occurred while fetching data." });
      setIsLoading(false);
    }
  };

  // Debouncing
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovie(`${API_URL}${apiParams}`);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;