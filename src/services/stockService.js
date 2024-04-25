import axios from 'axios'

const API_URL = 'https://api.twelvedata.com'
const API_KEY = import.meta.env.VITE_API_KEY

const useStockService = {
  async getTimeSeries(symbol, interval = '1h') {
    try {
      const cachedData = await sessionStorage.getItem(`resData-${symbol}-${interval}`);
      if (cachedData) {
        console.log('Data retrieved from sessionStorage.');
        return JSON.parse(cachedData);
      } else {
        const response = await axios.get(`${API_URL}/time_series?symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`);
        if (response.data.code === 429 || response.data.code === 404) {
          console.log('Error fetching time series:', response.data.message);
          return null;
        }
        sessionStorage.setItem(`resData-${symbol}-${interval}`, JSON.stringify(response.data));
        console.log('Data fetched from API.');
        return response.data;
      }
    }
    catch (error) {
      console.log('Error fetching time series: API Timeout', error);
      return null;
    }
  },
  async searchStocks(query) {
    try {
      const response = await axios.get(`${API_URL}/symbol_search?symbol=${query}&apikey=${API_KEY}`);
      return response.data.data;
    } catch (error) {
      console.log('Error searching stocks:', error);
      return null
    }
  },
}

export default useStockService