import React from 'react';
import AddComment from './AddComment';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

const BlogComments = ({ blog }) => {
    return (
        <Box mt={3}>
            <Typography variant="h5">Comments</Typography>
            <AddComment id={blog.id} />
            {!blog.comments || blog.comments.length < 1 ? (
                <Typography>No comments found...</Typography>
            ) : (
                <List>
                    {blog.comments.map((comment, index) => (
                        <ListItem key={index}>
                            <CommentIcon />
                            <ListItemText inset={true} primary={comment}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default BlogComments;
