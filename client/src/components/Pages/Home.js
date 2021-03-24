import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormInput from '../FormInput';
import { signin, signup } from '../../actions/auth';
import gsap from 'gsap';

const initialState = { firstName: '', lastName: '', email: '', password: '' };

export const Home = () => {
    const isSignup = false;
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLoading();
        if (isSignup) {
            console.log(isSignup);
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleLoading = () => {
        setLoading(false);
        
        const trueLoading = () => {
            setLoading(true);
        }

        setTimeout(trueLoading, 5000);
    }

    useEffect(() => {
        gsap.from('h1', { duration: 3, ease: 'power4.out', x: '-25%' })
        gsap.from('h1', { duration: 1.5, opacity: 0, ease: 'circ.out' })
        gsap.from('p', { duration: 1.5, opacity: 0, ease: 'power4.out', delay: 1 })
        gsap.from('form', { duration: 1, opacity: 0, delay: 1.5})
    }, []);

    return (
        <div className="landing">
            <div className="container">
                <div className="landing__content">
                    <div className="landing__text">
                        <h1 className="jubi">jubi</h1>
                        <p>for your favorite shows and movies</p>
                    </div>
                    <div className="landing__login">
                        <form className="landing__login__form" autoComplete="off" onSubmit={handleSubmit}>
                            <FormInput name="email" label="Email" type="email" handleChange={handleChange}/>
                            <FormInput name="password" label="Password" type="password" handleChange={handleChange} />
                            <button type="submit"><span>{loading ? 'Login' : <i
                                className="fa fa-refresh fa-spin"
                            />}</span></button>
                        </form>        
                    </div>
                </div>
            </div>
        </div>
    )
}
