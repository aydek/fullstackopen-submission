import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import Notification from './Notification';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitLoginForm = async (event) => {
        event.preventDefault();
        dispatch(loginUser(username, password));
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={submitLoginForm} noValidate sx={{ mt: 1 }}>
                    <Notification />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="User name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;
