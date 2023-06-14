import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUserData } from '../reducers/userReducer';
import { AppBar, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(deleteUserData());
    };
    return (
        <AppBar position="static" color="primary">
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <Typography sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}>Blogs app</Typography>
                <Button color="inherit" onClick={() => navigate('/')}>
                    Blogs
                </Button>
                <Button color="inherit" onClick={() => navigate('/users')}>
                    Users
                </Button>
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ display: { xs: 'none', md: 'block' } }}>{user.name} logged in </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Box>
        </AppBar>
    );
};

export default Nav;
