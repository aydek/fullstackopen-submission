import { useEffect, useState } from 'react';
import UserService from '../services/users';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await UserService.getAll();
            setUsers(response);
        };
        fetch();
    }, []);

    return (
        <div>
            <h2>Users</h2>
            {users.length ? (
                <table>
                    <thead>
                        <tr>
                            <td> </td>
                            <td>
                                <strong>blogs created</strong>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No users found...</div>
            )}
        </div>
    );
};

export default Users;
