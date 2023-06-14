import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography } from '@mui/material';

const AddBlogForm = ({ handleNewBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const newBlog = (event) => {
        event.preventDefault();

        handleNewBlog(title, author, url);
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <Box component="main" maxWidth="xs">
            <Box component="form" onSubmit={newBlog}>
                <Typography variant="h5">Create new</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Author"
                    name="author"
                    autoComplete="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField margin="normal" required fullWidth label="URL" name="url" autoComplete="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Button type="submit" variant="outlined" fullWidth>
                    Create
                </Button>
            </Box>
        </Box>
    );
};

export default AddBlogForm;

AddBlogForm.propTypes = {
    handleNewBlog: PropTypes.func.isRequired,
};
