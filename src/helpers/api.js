import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:2500'
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