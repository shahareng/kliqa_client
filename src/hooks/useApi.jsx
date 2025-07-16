import { useState, useEffect } from "react";
import { api } from "../helpers/api";


// const useApi = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   const logRequest = (method, url, params, body, response, error, enableLogging) => {
//     if (!enableLogging) return;

//     console.log(
//       `%c[API] ${method.toUpperCase()} ${url}`,
//       `color: ${error ? "red" : "green"}; font-weight: bold;`,
//       {
//         params,
//         body,
//         response,
//         error: error ? error.message : null,
//       }
//     );
//   };

//   const request = useCallback(async (method, endpoint, { params = {}, body = {}, enableLogging = false } = {}) => {
//     setLoading(true);
//     setError(null);
//     setData(null);

//     const url = `${BASE_URL}${endpoint}`;

//     try {
//       const response = await axios({
//         method,
//         url,
//         params,
//         data: body,
//       });

//       setData(response.data);
//       logRequest(method, url, params, body, response.data, null, enableLogging);
//       return response.data;
//     } catch (err) {
//       setError(err);
//       logRequest(method, url, params, body, null, err, enableLogging);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const clear = () => {
//     setData(null);
//   };

//   return {
//     loading,
//     error,
//     data,
//     clear,
//     get: (endpoint, options) => request("get", endpoint, options),
//     post: (endpoint, options) => request("post", endpoint, options),
//     put: (endpoint, options) => request("put", endpoint, options),
//     del: (endpoint, options) => request("delete", endpoint, options),
//   };
// };

// export default useApi;

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