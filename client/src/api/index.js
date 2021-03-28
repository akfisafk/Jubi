import axios from 'axios';

const API = axios.create({ baseURL: 'https://akfisafk-jubi-backend.zeet.app/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const favorited = (data) => API.post('/users/favorited', data);
export const nameChange = (fullFormData) => API.post('/users/namechange', fullFormData);
export const passwordChange = (fullFormData) => API.post('/users/passwordchange', fullFormData);
export const guestLogIn = (formData) => API.post('/users/guest', formData);
