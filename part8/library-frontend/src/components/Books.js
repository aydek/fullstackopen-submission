import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../querys';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Books = () => {
    const result = useQuery(ALL_BOOKS);
    if (result.loading) {
        return <div>loading...</div>;
    }
    const books = result.data.allBooks;

    return (
        <TableContainer component={Paper} sx={{ width: '80%' }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Book</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Published</TableCell>
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
        </TableContainer>
    );
};

export default Books;
