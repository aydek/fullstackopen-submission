import { useQuery } from '@apollo/client';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { ALL_BOOKS, FAVORITE_GENRE } from '../querys';

const Recommend = () => {
    const favorite = useQuery(FAVORITE_GENRE);
    const books = useQuery(ALL_BOOKS, {
        variables: { genre: !favorite.loading ? favorite.data.me.favoriteGenre : '' },
    });

    useEffect(() => {
        books.refetch();
    }, [favorite.data, books]);

    return (
        !favorite.loading &&
        !books.loading && (
            <Paper sx={{ p: 2 }}>
                <Typography variant="h4">Recomendatios</Typography>
                <Typography>
                    Books in your favorite genre: <strong>{favorite.data.me.favoriteGenre}</strong>
                </Typography>
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
                        {books.data.allBooks.map((a) => (
                            <TableRow key={a.title}>
                                <TableCell>{a.title}</TableCell>
                                <TableCell>{a.author.name}</TableCell>
                                <TableCell>{a.published}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    );
};

export default Recommend;
