import { useReducer } from 'react';
import { createContext } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                message: action.payload.message,
                timeoutID: action.payload.timeoutID,
            };
        case 'CLEAR_NOTIFICATION':
            return {
                message: '',
            };
        default:
            return state;
    }
};

export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, { message: '', timeoutID: null });

    const setNotification = (message) => {
        if (state.timeoutID) {
            clearTimeout(state.timeoutID);
        }
        const timeout = setTimeout(() => {
            clearNotification();
        }, 5000);
        dispatch({
            type: 'SET_NOTIFICATION',
            payload: { message, timeoutID: timeout },
        });
    };

    const clearNotification = () => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
    };

    return <NotificationContext.Provider value={{ notification: state, setNotification }}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
