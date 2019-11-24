const axios = require('axios');

const EXCHANGE_API = "https://api.exchangeratesapi.io";
export const getLatestRates = () => axios.get(`${EXCHANGE_API}/latest`);


const LOCAL_API = 'http://localhost:5000';
export const addTrade = (data) => axios.post(`${LOCAL_API}/trades`, data);
export const getTrades = () => axios.get(`${LOCAL_API}/trades`);
