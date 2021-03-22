import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

const api_key = process.env.API_KEY;

export const popular = async (req, res) => {
    let data = await getPopular();
    res.send(data.results);
}

export const toprated = async (req, res) => {
    let data = await getTopRated();
    res.send(data.results);
}

export const horror = async (req, res) => {
    let data = await getHorror();
    res.send(data.results);
}

export const nowplaying = async (req, res) => {
    let data = await getNowPlaying();
    res.send(data.results.reverse());
}

export const search = async (req, res) => {
    console.log('someone is searching')
    const { search } = req.body;
    console.log(search);
    let data = await getSearch(search);
    res.send(data);
}

export const getRecommended = async (req, res) => {
    const { recommend_id } = req.body;
    console.log('Movie to find recommendations for is:')
    console.log(recommend_id);
    let data = ''
    if (recommend_id) {
        await axios.get(`https://api.themoviedb.org/3/movie/${recommend_id}/recommendations?api_key=${api_key}&language=en-US&page=1`)
            .then(response => {
                data = response.data.results;
                console.log(data);
                res.send(data);
            })
            .catch(error => {
                console.log(error.response);
            })
    } else return
}

async function getPopular() {
    let data = '';
    await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`)
        .then(response => {
            data = response.data;
            // console.log(data);
        })
        .catch(error => {
            console.log(error.response);
        })
    return data;
}

async function getTopRated() {
    let data = '';
    await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`)
        .then(response => {
            data = response.data;
            // console.log(data);
        })
        .catch(error => {
            console.log(error.response);
        })
    return data;
}

async function getHorror() {
    let data = '';
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&page=1&with_genres=27`)
        .then(response => {
            data = response.data;
            // console.log(data);
        })
        .catch(error => {
            console.log(error.response);
        })
    return data
}

async function getNowPlaying() {
    let data = '';
    await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`)
        .then(response => {
            data = response.data;
            // console.log(data);
        })
        .catch(error => {
            console.log(error.response);
        })
    return data
}

async function getGenres() {
    let data = '';
    await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`)
        .then(response => {
            data = response.data;
            // console.log(data);
        })
        .catch(error => {
            console.log(error.response);
        })
    // return data
}

async function getSearch(search) {
    let data = '';
    await axios.get(`https://api.themoviedb.org/3/search/company?api_key=${api_key}&query=${search}&page=1`)
        .then(response => {
            data = response.data;
            console.log(data);
        })
        .catch(error => {
            console.log(error.response);
        })
}

getGenres();

async function getMany() {
    let data = []
    let popular = await getPopular();
    let topRated = await getTopRated();
    data.push(popular);
    data.push(topRated);
    return data;
}