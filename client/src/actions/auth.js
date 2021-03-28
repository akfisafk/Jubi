import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        history.push('/all');
    } catch (error) {
        console.log(error);
    }
};

export const guestLogIn = (formData, history) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.guestLogIn(formData);

        dispatch({ type: AUTH, data });

        history.push('/all');
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        history.push('/all');
    } catch (error) {
        console.log(error);
    }
};

export const favorited = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.favorited(formData);

        dispatch({ type: AUTH, data });

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const nameChange = (fullFormData, history) => async (dispatch) => {
    try {
        // console.log(fullFormData);
        const { data } = await api.nameChange(fullFormData);

        dispatch({ type: AUTH, data });

        history.push('/settings');
    } catch (error) {
        console.log(error);
    }
}

export const passwordChange = (fullFormData, history) => async (dispatch) => {
    try {
        const { data } = await api.passwordChange(fullFormData);

        dispatch({ type: AUTH, data });


        history.push('/settings');
    } catch (error) {
        console.log(error);
    }
}

