import { useState } from "react";
import { api } from "../helpers/api";


function useApi( url, method = "GET", body = {}, params = {} ) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const callApi = async () => {
    setLoading(true);
    try {
      const res = await api({ url, method, body, params });
      setData(res);
      setError(null);
      return res;
    } catch (err) {
      setError(err);
      setData(undefined);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, callApi };
}

export default useApi;