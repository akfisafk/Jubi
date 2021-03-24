import Item from "../Item";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { favorited } from '../actions/auth';
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import Tag from './Tag';

const STYLES = {
    TITLE: {
        position: 'absolute',
        bottom: '3%',
        left: '5%',
        margin: '0',
        fontSize: '34px',
        color: 'white',
        background: 'transparent'
    },
    BUTTON: {
        width: '80px',
        position: 'fixed',
        margin: '10px 0 0 15px',
        padding: '6px 8px',
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '3px'
    },
    CLICK: {
        width: '80px',
        position: 'fixed',
        margin: '10px 0 0 15px',
        padding: '6px 8px',
        backgroundColor: '#DF853C',
        color: 'white',
        border: '1px solid white',
        borderRadius: '3px'
    },
    HOVER: {
        width: '80px',
        position: 'fixed',
        margin: '10px 0 0 15px',
        padding: '6px 8px',
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px solid white',
        borderRadius: '3px'
    },
    MODAL_IMG: {
        position: 'relative',
        width: '100%',
        zIndex: -1,
        display: 'block'
    },
    MODAL_IMG_GRADIENT: {
        background: 'linear-gradient(0deg, #00000088 30%, #ffffff44 100%',
        position: 'relative'
    },
    CLOSE: {
        position: 'absolute',
        top: '5%',
        right: '3%',
        color: 'white',
        background: 'transparent',
        border: 'none',
        fontSize: '2rem'
    },
    CONTAINER: {
        padding: '10px 30px'
    },
    RELEASE: {
        fontWeight: 'normal',
        fontSize: '20px'
    },
    OVERVIEW: {
        margin: '10px 0 0 0',
        fontSize: '20px',
        fontFamily: 'proxima-nova, sans-serif'
    },
    TAGS: {
        position: 'relative',
        margin: '-50px 0 0 0',
        left: '8%',
        display: 'flex',
        flexWrap: 'wrap'
    },
    TAG: {
        fontSize: '15px',
        backgroundColor: 'rgb(206, 206, 206)',
        borderRadius: '20%',
        margin: '6px 10px',
        padding: '2px 6px'
    }
}

const Movie = ({ movie }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const FavoriteButton = () => {
        const [click, setClick] = useState(false);
        const [hover, setHover] = useState(false);

        const mouseDown = () => {
            if (!click) {
                setClick(true);
                handleFavorite(true);
            } else {
                setClick(false);
                handleFavorite(false);
            }
        }

        const hoverOn = () => {
            setHover(true);
        }

        const hoverOff = () => {
            setHover(false);
        }

        return (
            <>
                <button
                    onMouseDown={mouseDown}
                    onMouseEnter={hoverOn}
                    onMouseLeave={hoverOff}
                    style={click ? STYLES.CLICK : hover ? STYLES.HOVER : STYLES.BUTTON}>
                    {click ? 'Favorited!' : 'Favorite'}
                </button>
            </>
        );
    }

    const handleFavorite = (boolean) => {
        if (boolean === true) {
            const formData = {
                name: user.result.name,
                id: user.result._id,
                original_title: movie.original_title,
                poster_path: movie.poster_path,
                overview: movie.overview,
                genre_ids: movie.genre_ids,
                movie_id: movie.id
            }
            dispatch(favorited(formData, history));
        } else {
            // handle unfavoriting feature
            const formData = {
                name: user.result.name,
                id: user.result._id,
                original_title: movie.original_title,
                poster_path: movie.poster_path,
                overview: movie.overview,
                genre_ids: movie.genre_ids,
                movie_id: movie.id
            }
            dispatch(favorited(formData, history));
        }
    }

    return (
        <>
            <Item key={Math.random()}>
                <img className="movie__poster" src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                    alt=""
                    onClick={() => setIsOpen(true)}
                />
            </Item>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div style={STYLES.MODAL_IMG_GRADIENT}>
                    <img style={STYLES.MODAL_IMG} src={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path} alt="" />
                    <h3 style={STYLES.TITLE}>
                        {movie.original_title}
                        <FavoriteButton handleFavorite={handleFavorite} />
                    </h3>
                    <button style={STYLES.CLOSE} onClick={() => setIsOpen(false)}>X</button>
                </div>
                <div style={STYLES.CONTAINER}>
                    <h3 style={STYLES.RELEASE}>
                        {movie.release_date.slice(0, 4)}
                    </h3>
                    <div style={STYLES.TAGS}>
                        {movie.genre_ids.map(tag => {
                            return <span style={STYLES.TAG} key={Math.random()}><Tag tag={tag} /></span>
                        })}
                    </div>
                    <p style={STYLES.OVERVIEW}>
                        {movie.overview}
                    </p>
                </div>
            </Modal>
        </>
    )
};

export default Movie;