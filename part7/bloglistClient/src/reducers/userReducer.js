/* eslint-disable indent */
import { createSlice } from '@reduxjs/toolkit';
import LoginService from '../services/login';
import { showNotification } from './notificationReducer';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUserData: (state, action) => {
            return action.payload;
        },
    },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;

export const initUser = () => {
    return (dispatch, getState) => {
        if (getState().user) return;
        const loggeduser = window.localStorage.getItem('blogsUser');
        if (loggeduser) {
            const user = JSON.parse(loggeduser);
            dispatch(setUserData(user));
        }
    };
};

export const deleteUserData = () => {
    return (dispatch) => {
        window.localStorage.removeItem('blogsUser');
        dispatch(setUserData(null));
    };
};

export const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            const response = await LoginService.login(username, password);
            dispatch(setUserData(response));
            window.localStorage.setItem('blogsUser', JSON.stringify(response));
        } catch (error) {
            dispatch(showNotification(error.response.data.error, 5, 'error'));
        }
    };
};
