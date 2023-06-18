import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS, CREATE_BOOK } from '../querys';
import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateCache } from './Books';

const NewBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [createBook] = useMutation(CREATE_BOOK, {
        onError: (error) => {
            console.log(error);
            setError(error.graphQLErrors[0].message);
        },
        update: (cache, response) => {
            updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
        },
    });

    const submit = async (event) => {
        event.preventDefault();

        createBook({ variables: { title, author, published: Number(published), genres } });
        navigate('/books');

        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    };

    return (
        <Paper component="form" onSubmit={submit} sx={{ p: 2 }}>
            <Stack maxWidth={200}>
                <TextField margin="normal" label="Title" name="title" autoComplete="title" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField margin="normal" label="Author" name="author" autoComplete="author" value={author} onChange={(e) => setAuthor(e.target.value)} />

                <TextField
                    margin="normal"
                    type="number"
                    label="Published"
                    name="published"
                    autoComplete="published"
                    value={published}
                    onChange={(e) => setPublished(e.target.value)}
                />
            </Stack>
            <Stack direction="row">
                <TextField
                    margin="normal"
                    variant="standard"
                    type="text"
                    label="Genre"
                    name="genre"
                    autoComplete="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <Button onClick={addGenre}>Add</Button>
            </Stack>

            <Typography>Genres: {genres.join(' ')}</Typography>
            <Button variant="outlined" type="submit">
                Create book
            </Button>
            {error.length > 0 && <Alert severity="error">{error}</Alert>}
        </Paper>
    );
};

export default NewBook;
