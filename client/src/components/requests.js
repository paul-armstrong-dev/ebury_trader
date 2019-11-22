const APIURL = 'http://localhost:5000';
const axios = require('axios');


export const addContact = (data) => axios.post(`${APIURL}/trades`, data);


