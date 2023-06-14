import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../services/users';

const User = () => {
    const id = useParams().id;

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const response = await UserService.getAll();
            const user = response.find((an) => an.id === id);
            setUser(user);
        };
        fetch();
    }, []);

    return !user ? (
        <div>User not found...</div>
    ) : (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
            <ul>{user.blogs.length > 0 ? user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>) : <div>No blogs found...</div>}</ul>
        </div>
    );
};

export default User;
