import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

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
export const searchInput = async (searchData) => {
    let response = await API.post('/apis/search', searchData)
    console.log(response.data);
    return response
}