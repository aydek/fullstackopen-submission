import React, { useEffect, useState } from 'react';
import LoginService from '../services/login';

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitLoginForm = async (event) => {
        event.preventDefault();
        try {
            const response = await LoginService.login(username, password);
            setUser(response);
            window.localStorage.setItem('blogsUser', JSON.stringify(response));
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };

    useEffect(() => {
        setErrorMessage('');
    }, [username, password]);

    return (
        <form onSubmit={submitLoginForm}>
            <h1>Log in to application</h1>
            <div>
                username:
                <input type="text" name="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                password:
                <input type="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {errorMessage.length > 0 ? <div style={{ color: '#aa0000' }}>{errorMessage}</div> : null}
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
