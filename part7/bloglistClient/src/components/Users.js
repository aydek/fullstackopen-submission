import { useEffect, useState } from 'react';
import UserService from '../services/users';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await UserService.getAll();
            setUsers(response);
        };
        fetch();
    }, []);

    return (
        <Box sx={{ mt: 2 }}>
            {users.length ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User name</TableCell>
                                <TableCell>Blogs created</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Button onClick={() => navigate(`/users/${user.id}`)}>{user.name}</Button>
                                    </TableCell>
                                    <TableCell>{user.blogs.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No users found...</Typography>
            )}
        </Box>
    );
};

export default Users;
