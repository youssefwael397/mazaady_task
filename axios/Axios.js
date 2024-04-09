import axios from "axios"

// Create a new instance of Axios
export const api = axios.create({
  baseURL: 'https://staging.mazaady.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    'private-key': '3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16',    
  }
});

