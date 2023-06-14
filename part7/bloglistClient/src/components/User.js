import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../services/users';
import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

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

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            {!user ? (
                <Typography>User not found...</Typography>
            ) : (
                <Box>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        {user.name}
                    </Typography>
                    <Typography variant="h5">Added blogs</Typography>
                    <List>
                        {user.blogs.length > 0 ? (
                            user.blogs.map((blog) => (
                                <ListItem key={blog.id}>
                                    <CommentIcon />
                                    <ListItemText inset={true} primary={blog.title}></ListItemText>
                                </ListItem>
                            ))
                        ) : (
                            <Typography>No blogs found...</Typography>
                        )}
                    </List>
                </Box>
            )}
        </Paper>
    );
};

export default User;
