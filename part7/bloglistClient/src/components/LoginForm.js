import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import Notification from './Notification';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitLoginForm = async (event) => {
        event.preventDefault();
        dispatch(loginUser(username, password));
    };

    return (
        <form onSubmit={submitLoginForm}>
            <h1>Log in to application</h1>
            <Notification />
            <div>
                username:
                <input type="text" name="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                password:
                <input type="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
