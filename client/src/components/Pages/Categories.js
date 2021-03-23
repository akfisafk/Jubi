import React, { useReducer, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Category from '../Genres/Category';
import Popular from '../Genres/Popular';
import Recommended from '../Genres/Recommended';

const reducer = (items, action) => {
    switch (action.type) {
        case 'add-category':
            return [addCategory(action.payload)]
        default:
            return items;
    }
}

function addCategory(payload) {
    return { id: Date.now(), categories: payload.categories };
}

export const Categories = () => {
    const [populars, dispatchPopular] = useReducer(reducer, []);
    const [toprateds, dispatchTop] = useReducer(reducer, []);
    const [horrors, dispatchHorrors] = useReducer(reducer, []);
    const [nowplayings, dispatchNow] = useReducer(reducer, []);
    const [recommendeds, dispatchRec] = useReducer(reducer, []);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [toRecommend, setToRecommend] = useState({});
    const location = useLocation();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    useEffect(() => {
        async function getFavorites() {
            const response = await fetch(`https://akfisafk-jubi-backend.zeet.app/users/${user.result._id}/favorites`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then((result) => result.json())
            const randomNum = Math.floor(Math.random() * response.length);
            setToRecommend(response[randomNum]);

        }
        getFavorites();
    }, [user.result._id]);

    useEffect(() => {
        async function getRecommendations() {
        if (toRecommend)
            {
            const response = await fetch('https://akfisafk-jubi-backend.zeet.app/apis/recommended', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ recommend_id: toRecommend.movie_id })
                })
                    .then((result) => result.json())

                dispatchRec(
                    { type: 'add-category', payload: { categories: await response } }
                );
            }
        }
        getRecommendations();
    }, [toRecommend])

    useEffect(() => {
        async function getPopular() {
            const response = await fetch('https://akfisafk-jubi-backend.zeet.app/apis/popular', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
                .then((result) => result.json())

            // Handle dispatch
            dispatchPopular(
                { type: 'add-category', payload: { categories: await response } }
            );
        }
        getPopular();
    }, []);
    
    useEffect(() => {
        async function getTopRated() {
            const response = await fetch('https://akfisafk-jubi-backend.zeet.app/apis/toprated', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
                .then((result) => result.json())

            // Handle dispatch
            dispatchTop(
                { type: 'add-category', payload: { categories: await response } }
            );
        }
        getTopRated();
    }, []);

    useEffect(() => {
        async function getHorror() {
            const response = await fetch('https://akfisafk-jubi-backend.zeet.app/apis/horror', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
                .then((result) => result.json())

            // Handle dispatch
            dispatchHorrors(
                { type: 'add-category', payload: { categories: response } }
            );
        }
        getHorror();
    }, []);

    useEffect(() => {
        async function getNow() {
            const response = await fetch('https://akfisafk-jubi-backend.zeet.app/apis/nowplaying', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
                .then((result) => result.json())

            // Handle dispatch
            dispatchNow(
                { type: 'add-category', payload: { categories: response } }
            );
        }
        getNow()
    }, [])

    return (
        <>
            {/* {user ? (
            <>
            {populars.map(movie => {
                return <Popular key={movie.id} movie={movie} dispatch={dispatchPopular} />
            })
            }
            {recommendeds.map(movie => {
                return <Recommended key={movie.id} movie={movie} dispatch={dispatchRec} rec={toRecommend.original_title} />
            })}
            {nowplayings.map(movie => {
                return <Category key={movie.id} movie={movie} dispatch={dispatchNow} category="New Arrivals" />
            })}
            {horrors.map(movie => {
                return <Category key={movie.id} movie={movie} dispatch={dispatchHorrors} category="Horror" />
            })}
            {toprateds.map(movie => {
                return <Category key={movie.id} movie={movie} dispatch={dispatchTop} category="Top Rated" />
            })}
            </>
            ) : <h2>Must be logged in to access the movies</h2>} */}

            {populars.map(movie => {
                return <Popular key={movie.id} movie={movie} dispatch={dispatchPopular} />
            })}
            {recommendeds.map(movie => {
                return <Recommended key={movie.id} movie={movie} dispatch={dispatchRec} rec={toRecommend.original_title} />
            })}
            {nowplayings.map(movie => {
                return <Category key={movie.id} movie={movie} dispatch={dispatchNow} category="New Arrivals" />
            })}
            {horrors.map(movie => {
                return <Category key={movie.id} movie={movie} dispatch={dispatchHorrors} category="Horror" />
            })}
            {toprateds.map(movie => {
                return <Category key={movie.id} movie={movie} dispatch={dispatchTop} category="Top Rated" />
            })}
        </>
    )
}