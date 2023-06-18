import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES } from '../querys';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Books = () => {
    const [filter, setFilter] = useState('');

    const result = useQuery(ALL_BOOKS, {
        variables: { genre: filter },
    });

    const genres = useQuery(ALL_GENRES);

    const allGenres = !genres.loading && genres.data.allGenres;

    const books = !result.loading && result.data.allBooks;

    useEffect(() => {
        result.refetch();
    }, [filter, result]);

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
                            <TableCell>
                                <strong>Book</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Author</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Published</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((a) => (
                            <TableRow key={a.title}>
                                <TableCell>{a.title}</TableCell>
                                <TableCell>{a.author.name}</TableCell>
                                <TableCell>{a.published}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
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
