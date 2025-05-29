import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5161/api', // adjust port if needed
  headers: {
    'Content-Type': 'application/json'
  }
});

