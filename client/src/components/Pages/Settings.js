import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormInput from '../FormInput';
import { nameChange, passwordChange } from '../../actions/auth';

const initialState = { name:'', password: '' };

export const Settings = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [name, setName] = useState(true);
    const [password, setPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        // console.log(user.result._id);
        e.preventDefault();
        if (name) {
            dispatch(nameChange({ formData: formData, id: user.result._id } , history));
        }
        else {
            dispatch(passwordChange({ formData: formData, id: user.result._id }, history));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleNameSetting = () => {
        setName(true);
        setPassword(false);
    }

    const handlePasswordSetting = () => {
        setPassword(true);
        setName(false);
    }

    return (
        <div className="container">
            <div className="settings-content">
                {user ? (
                    <>
                        <h2>User Settings</h2>
                        <form className="settings-form" onSubmit={handleSubmit}>
                            <li className="settings-option" onClick={handleNameSetting}>Change Name</li>
                            <li className="settings-option" onClick={handlePasswordSetting}>Change Password</li>
                            {name && (
                                <>
                                    <label htmlFor="name">New Name</label>
                                    <FormInput name="name" label={user.result.name} type="name" handleChange={handleChange} />
                                </>
                            )}
                            {password && (
                                <>
                                    <label htmlFor="name">Current Password</label>
                                    <FormInput name="confirmPassword" label="Current Password" type="password" handleChange={handleChange} />
                                    <label htmlFor="name">New Password</label>
                                    <FormInput name="newPassword" label="New Password" type="password" handleChange={handleChange} />
                                </>
                            )}
                            <button type="submit">Submit</button>
                        </form>
                    </>
                ) : <h2>Must be logged in to access settings</h2>
                }
            </div>
        </div>
    )
}
