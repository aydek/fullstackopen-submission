import { useEffect } from 'react';
import UserService from '../services/users';

const Users = () => {
    useEffect(() => {
        const fetch = async () => {
            const users = await UserService.getAll();
            console.log(users);
        };

        fetch();
    }, []);

    return (
        <div>
            <h2>Users</h2>
        </div>
    );
};

export default Users;
