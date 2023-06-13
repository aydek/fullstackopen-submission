import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    timeoutId: null,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showMessage: (state, action) => {
            const { message, newTimeoutId } = action.payload;
            state.message = message;
            state.timeoutId = newTimeoutId;
        },
        hideMessage: (state) => {
            state.message = '';
            state.timeoutId = null;
        },
    },
});

export const { showMessage, hideMessage, setTimeoutId } = notificationSlice.actions;
export default notificationSlice.reducer;

export const showNotification = (message, timeout) => (dispatch, getState) => {
    const { timeoutId } = getState().notification;

    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
        dispatch(hideMessage());
    }, timeout * 1000);

    dispatch(showMessage({ message, newTimeoutId }));
};
