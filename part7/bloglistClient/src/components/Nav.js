import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserData } from '../reducers/userReducer';

const Nav = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(deleteUserData());
    };
    return (
        <div style={{ backgroundColor: 'gray', padding: 5 }}>
            <Link style={{ padding: 5 }} to="/">
                blogs
            </Link>
            <Link style={{ padding: 5 }} to="/users">
                users
            </Link>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Nav;
