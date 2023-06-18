import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../querys';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Book from './Book';

const Books = () => {
    const result = useQuery(ALL_BOOKS);
    const [filter, setFilter] = useState('');
    const [allGenres, setAllGenres] = useState([]);

    const books = !result.loading && result.data.allBooks;

    useEffect(() => {
        if (!result.loading && books) {
            const genres = [];
            for (const book of books) {
                for (const genre of book.genres) {
                    if (!genres.includes(genre) && genre.length > 0) {
                        genres.push(genre);
                    }
                }
            }
            setAllGenres(genres);
        }
    }, [books, result.loading]);

    return result.loading ? (
        <Typography>loading...</Typography>
    ) : (
        <Box>
            {filter.length > 0 && (
                <Typography>
                    In genre: <strong>{filter}</strong>
                </Typography>
            )}
            <TableContainer component={Paper} sx={{ width: '80%', p: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Book</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Published</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{filter.length > 0 ? <Book books={books.filter((book) => book.genres.includes(filter))} /> : <Book books={books} />}</TableBody>
                </Table>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
                    {allGenres.length > 1 &&
                        allGenres.map((genre) => (
                            <Button key={genre} variant="outlined" onClick={() => setFilter(genre)}>
                                {genre}
                            </Button>
                        ))}
                    <Button variant="outlined" color="secondary" onClick={() => setFilter('')}>
                        All genres
                    </Button>
                </Stack>
            </TableContainer>
        </Box>
    );
};

export default Books;
