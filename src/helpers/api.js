import axios from "axios";

// export const api = async ({ url, method = 'GET', headers = {}, params = {}, body = {} }) => {
//     console.log('here api', params);

//     const res = await axios({ url: `http://localhost:2500/${url}`, data: body, method, params })
//     // {
//     // const res = await axios(`http://localhost:2500/${url}`, {
//     // method: method,
//     // params: params,
//     // headers: headers }
//     // )
//     console.log('res.data ', res.data);

//     return res.data
// }

const apiClient = axios.create({
    baseURL: 'http://localhost:2500', 
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${!localStorage.token? " " : localStorage.token}`
    // },
  });

// פונקציה גנרית לביצוע בקשות
export const api = async ({ url, method = 'GET', body, params = {} }) => {
    if (!url) {
        console.warn('No URL provided for the request');
        return '';
      }

    console.log(`Making request to: ${url} with method: ${method}`);
  
    try {
      const response = await apiClient({
        url,
        method,
        data : body,
        params,
      });
  
      return response.data;
    } catch (error) {
      console.error(`Error making request to: ${url}`, error.message);
      
      throw error;
    }
  };