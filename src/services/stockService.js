import axios from 'axios'

const API_URL = 'https://api.twelvedata.com'
const API_KEY = ''


const useStockService = {
  async getTimeSeries(symbol, interval = '1min') {
    try {
      const response = await axios.get(`${API_URL}/time_series?symbol=${symbol}&interval=1min&apikey=${API_KEY}`);
      return response.data;
    }
    catch (error) {
      console.error('Error fetching time series:', error);
      return [];
    }
  },
  async searchStocks(query) {
    try {
      const response = await axios.get(`${API_URL}/symbol_search?symbol=${query}&apikey=${API_KEY}`);
      return response.data.data;
    } catch (error) {
      console.error('Error searching stocks:', error);
      return [];
    }
  },
}

export default useStockService