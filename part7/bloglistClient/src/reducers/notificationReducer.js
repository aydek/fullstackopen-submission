/* eslint-disable indent */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    timeoutId: null,
    type: 'info',
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showMessage: (state, action) => {
            const { message, newTimeoutId, type } = action.payload;
            state.message = message;
            state.timeoutId = newTimeoutId;
            state.type = type;
        },
        hideMessage: (state) => {
            state.message = '';
            state.timeoutId = null;
        },
    },
});

export const { showMessage, hideMessage, setTimeoutId } = notificationSlice.actions;
export default notificationSlice.reducer;

export const showNotification =
    (message, timeout, type = 'info') =>
    (dispatch, getState) => {
        const { timeoutId } = getState().notification;

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            dispatch(hideMessage());
        }, timeout * 1000);

        dispatch(showMessage({ message, newTimeoutId, type }));
    };
