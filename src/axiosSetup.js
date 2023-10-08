import axiosSetup from 'axios';
import router from './routers';


axiosSetup.defaults.baseURL = import.meta.env.VITE_MAIN_API_URL;
axiosSetup.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (localStorage.getItem('_token')) {
  axiosSetup.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('_token');
}



// Add a request interceptor
axiosSetup.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosSetup.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    router.push({ name: 'login' })
  }
  return Promise.reject(error);
});


export default axiosSetup;