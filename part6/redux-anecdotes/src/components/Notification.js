import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setNotification } from '../reducers/notificationReducer';

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
    };

    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notification);

    useEffect(() => {
        if (notification.length > 0) {
            setTimeout(() => {
                dispatch(setNotification(''));
            }, 5000);
        }
    }, [notification.length, dispatch]);

    return notification.length > 0 && <div style={style}>{notification}</div>;
};

export default Notification;
