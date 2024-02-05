import axios from 'axios';

const apiBaseUrl = 'https://make-matcher-backend.fly.dev/api';

function generateToken() {
  const key = process.env.REACT_APP_API_KEY;
  const secret = process.env.REACT_APP_API_SECRET;
  return `${key}::${secret}::${Date.now()}`;
}

function getHeaders() {
  const token = generateToken();
  return {
    'x-api-key': `Bearer ${token}`,
  };
}

export function apiGet(path, params = {}) {
  console.log(`GET request to: ${apiBaseUrl}/${path}`);
  console.log('params:', params);
  // console.log('headers:', getHeaders());
  return axios
    .get(`${apiBaseUrl}/${path}`, {
      headers: getHeaders(),
      params,
    })
    .catch(handleAxiosError);
}

export function apiPost(path, data = {}) {
  console.log(`POST request to: ${apiBaseUrl}/${path}`);
  console.log('data:', data);
  // console.log('headers:', getHeaders());

  return axios
    .post(`${apiBaseUrl}/${path}`, data, {
      headers: getHeaders(),
    })
    .catch(handleAxiosError);
}

function handleAxiosError(error) {
  if (axios.isAxiosError(error)) {
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data.message || error.message,
    });
  }

  return Promise.reject(error);
}

export function getErrorMessage(error) {
  console.log('*** error: ', error);
  let errorMessage = 'An unknown error occurred';

  // if error is an Axios error
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.message;
    // if  message is array
    if (Array.isArray(message)) {
      errorMessage = `Error ${error.response?.status}: ${message.join(', ')}`;
    }
    // if message is string
    else if (typeof message === 'string') {
      errorMessage = `Error ${error.response?.status}: ${message}`;
    }
    // anything else
    else {
      errorMessage = `Error ${error.response?.status}: ${error.message}`;
    }
  }
  // direct error objects handling
  else if (error && error.status) {
    if (typeof error.message === 'string') {
      errorMessage = `Error ${error.status}: ${error.message}`;
    } else if (Array.isArray(error.message) && error.message.length) {
      errorMessage = `Error ${error.status}: ${error.message.join(', ')}`;
    }
  }
  // if standard js error objects
  else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return errorMessage;
}
