import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../constants/actionTypes';
import { Link } from 'react-router-dom';
import SignupInput from './SignupInput';
import { signup } from '../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '' };

export const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [formData, setFormData] = useState(initialState);
    const [darkMode, setDarkMode] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [signUpClicked, setSignUpClicked] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(formData, history));
    }

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        setUser(null);
        setIsHovered(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const handleHoverTrue = () => {
        setIsHovered(true);
    }

    const handleHoverFalse = () => {
        setIsHovered(false);
    }

    const handleSignUpClick = () => {
        setSignUpClicked(true);
    }

    const handleSignUpFalse = () => {
        setSignUpClicked(false);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const allClick = () => {
        history.push('/all')
    }

    const settingsClick = () => {
        history.push('/settings')
    }

    const favoritesClick = () => {
        history.push('/favorites')
    }

    const logoutClick = () => {
        logout();
        history.push('/')
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);


    return (
        <div className="navbar-container" style={darkMode ? { backgroundColor: "#F8F8FA" } : null}>
            <div className="container">
                <div className="navbar flex">

                    <div className="navbar__left">
                        <ul className="nav-list flex">
                            <Link to={user ? '/all' : '/'}
                                style={{ fontSize: '24px', color: 'rgb(223, 133, 60)', margin: '0 20px' }}
                            >jubi</Link>

                            {user && (
                                <>
                                    <Link to="/all"
                                        style={darkMode ? { color: 'black', margin: '0 20px', height: '100%', display: 'flex', alignItems: 'center' }
                                            : { color: 'white', margin: '0 20px', height: '100%', display: 'flex', alignItems: 'center' }}
                                    >All</Link>
                                    <Link to="/favorites"
                                        style={darkMode ? { color: 'black', margin: '0 20px', height: '100%', display: 'flex', alignItems: 'center' }
                                            : { color: 'white', margin: '0 20px', height: '100%', display: 'flex', alignItems: 'center' }}
                                    >Favorites</Link>
                                </>
                            )}
                            
                        </ul>
                    </div>

                    <div className="navbar__right">
                        <ul className="nav-list flex">
                            {user && (
                                <>
                                    {/* <form onSubmit={handleSearch}>
                                        <SignupInput name="search" label="Search" type="search" handleChange={handleSearchChange} />
                                    </form> */}
                                    <li className="users-name"
                                        onClick={handleHoverTrue}
                                        onMouseLeave={handleHoverFalse}>
                                        {user?.result.name.charAt(0)}
                                    </li>
                                    <div className={isHovered ? "menu-display" : "menu"}
                                        onMouseEnter={handleHoverTrue}
                                        onMouseLeave={handleHoverFalse}>
                                        <ul className="menu-display__list">
                                            <li onClick={allClick}>
                                                <Link to="/all"
                                                    style={{ color: 'black', innerWidth: '100%', height: '100%'}}
                                                >Home
                                                </Link>
                                            </li>
                                            <li onClick={settingsClick}>
                                                <Link to="/settings"
                                                    style={{ color: 'black' }}
                                                >Settings
                                                </Link>
                                            </li>
                                            <li onClick={favoritesClick}>
                                                <Link to="/favorites"
                                                    style={{ color: 'black' }}
                                                >Favorites
                                                </Link>
                                            </li>
                                            <li className="menu_display__list__logout" onClick={logoutClick}>
                                                <Link to="/"
                                                    style={{ color: 'black' }}
                                                    onClick={logout}
                                                >Log out
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <li className="logout"><a href="/" onClick={logout}>Log out</a></li> */}
                                </>
                            )}

                            {!user && (
                                <>
                                    <li className="signup" onClick={handleSignUpClick}>Sign up</li>
                                    <div className={signUpClicked ? "signup-form-display" : "signup-form"}
                                        onMouseLeave={handleSignUpFalse}>
                                        <form action="" onSubmit={handleSubmit} autoComplete="off">
                                            <SignupInput name="name" label="Name" type="name" handleChange={handleChange} />
                                            <SignupInput name="email" label="Email" type="email" handleChange={handleChange} />
                                            <SignupInput name="password" label="Password" type="password" handleChange={handleChange} />
                                            <button className="signup-btn" type="submit"><span>Make Account</span></button>
                                        </form>
                                    </div>
                                </>
                            )}

                            <div className="mode-container">
                                <span className="current-mode" style={darkMode ? { color: "black" } : null}>Dark Nav</span>
                                <label className="switch">
                                    <input type="checkbox" onClick={toggleDarkMode} />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};