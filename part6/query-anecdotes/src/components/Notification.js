import { useContext } from 'react';
import NotificationContext from '../context/notificationContext';

const Notification = () => {
    const { notification } = useContext(NotificationContext);
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    };

    return notification.message.length > 0 && <div style={style}>{notification.message}</div>;
};

export default Notification;
