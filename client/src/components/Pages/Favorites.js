import React, { useState, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Favorite from '../Favorite';

function reducer(favorites, action) {
    switch (action.type) {
        case 'add-favorite':
            return [addFavorite(action.payload)];
        default:
            return favorites;
    }
}

function addFavorite(payload) {
    return { id: Math.random(), favorites: payload.favorites };
}

export const Favorites = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [favorites, favoritesDispatch] = useReducer(reducer, []);
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
                },
            })
                .then((result) => result.json())
            console.log(response)

            // Handle dispatch
            favoritesDispatch(
                { type: 'add-favorite', payload: { favorites: await response } }
            );
        }
        getFavorites();
    }, [user.result._id]);

    return (
        <div className="container">
            <h1 className="favorites-title">Favorite Movies</h1>
            <div className="favorites-list">
                {favorites.map(favorite => {
                    return <Favorite key={favorite.id} favorite={favorite} dispatch={favoritesDispatch} />
                })}
            </div>
        </div>
    )
}

export default Favorites
