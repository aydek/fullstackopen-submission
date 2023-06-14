import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector((state) => state.notification);

    return (
        notification.message.length > 0 && (
            <Alert sx={{ mt: 2 }} severity={notification.type}>
                {notification.message}
            </Alert>
        )
    );
};

export default Notification;
