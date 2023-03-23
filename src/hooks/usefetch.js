import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (method, url,token) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiError, setApiError] = useState('');
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
          data: {},
          headers:{
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response?.data.data;
        setApiData(data);
        setIsLoading(false);
      } catch (error) {
      
        setApiError(error);
        setIsLoading(false);
      }
    };

    fetchData();

  }, [url, method]);

  return { isLoading, apiData, apiError };
};

export default useFetch;
