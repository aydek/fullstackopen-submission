import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector((state) => state.notification);

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        color: notification.type === 'error' ? 'red' : 'green',
    };

    return notification.message.length > 0 && <div style={style}>{notification.message}</div>;
};

export default Notification;
