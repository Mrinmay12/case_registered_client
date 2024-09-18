// api.js

import axios from 'axios';

const apiUrl = axios.create({
  // baseURL: "https://dellife-server2-o.onrender.com", 
  baseURL: process.env.REACT_APP_API_URL, 
   // Timeout for requests in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set the default content type for requests
    // Add any other common headers you want to include
  },
});

export default apiUrl;
