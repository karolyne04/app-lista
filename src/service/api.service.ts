import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use(null, (error) => {
  const { config, response } = error;
  const retryCount = config.__retryCount || 0;

  if (response.status === 429 && retryCount < 3) {
    config.__retryCount = retryCount + 1;
    const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
    return new Promise((resolve) => setTimeout(() => resolve(instance(config)), delay));
  }

  return Promise.reject(error);
});

export default instance;
