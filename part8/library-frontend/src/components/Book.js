import { TableCell, TableRow } from '@mui/material';
import React from 'react';

const Book = ({ books }) => {
    return books.map((a) => (
        <TableRow key={a.title}>
            <TableCell>{a.title}</TableCell>
            <TableCell>{a.author.name}</TableCell>
            <TableCell>{a.published}</TableCell>
        </TableRow>
    ));
};

export default Book;
