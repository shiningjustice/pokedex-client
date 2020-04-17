export default {
  API_ENDPOINT: process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_ENDPOINT
    : 'http://localhost:8000/api',
    TOKEN_KEY: process.env.TOKEN_KEY,
}