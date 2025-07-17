import axios from "axios";

const gptApiClient = axios.create({
  baseURL: "http://localhost:3001",
});

export const gptApi = async ({ url, method = 'POST', body, params = {} }) => {
  try {
    const res = await gptApiClient({ url, method, data: body, params });
    return res.data;
  } catch (err) {
    console.error(`[GPT API] Error at ${url}:`, err.message);
    throw err;
  }
};
