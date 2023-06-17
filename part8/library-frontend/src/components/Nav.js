import { Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = ({ token, logout }) => {
    const navigate = useNavigate();
    return (
        <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
            <Button variant="outlined" onClick={() => navigate('/')}>
                Authors
            </Button>
            <Button variant="outlined" onClick={() => navigate('/books')}>
                Books
            </Button>
            {token && (
                <Stack spacing={1} direction="row">
                    <Button variant="outlined" onClick={() => navigate('/add')}>
                        Add book
                    </Button>
                    <Button variant="outlined" onClick={logout}>
                        Logout
                    </Button>
                </Stack>
            )}
            {!token && (
                <Button variant="outlined" onClick={() => navigate('/login')}>
                    Login
                </Button>
            )}
        </Stack>
    );
};

export default Nav;
