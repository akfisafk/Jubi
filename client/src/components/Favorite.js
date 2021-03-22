import React from 'react';

const STYLES = {
    FAVORITE: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    TITLE: {
        margin: '6px 0 30px 0'
    }
}

const Favorite = ({ favorite, dispatch }) => {
    return (
        favorite.favorites.map(favorite => {
            return <Fav key={Math.random()} favorite={favorite} newDispatch={dispatch} />
        })
    )
}

const Fav = ({ favorite }) => {
    return (
        <>
            <div style={STYLES.FAVORITE}>
                <img className="favorite__poster" src={"https://image.tmdb.org/t/p/w300/" + favorite.poster_path}
                    alt=""
                />
                <h2 style={STYLES.TITLE}>{favorite.original_title}</h2>
            </div>
        </>
    )
}

export default Favorite;
