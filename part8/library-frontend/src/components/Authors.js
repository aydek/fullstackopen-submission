import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../querys';
import SetYear from './SetYear';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Authors = ({ token }) => {
    const result = useQuery(ALL_AUTHORS);
    if (result.loading) {
        return <div>loading...</div>;
    }

    const authors = result.data.allAuthors;

    return (
        <TableContainer component={Paper} sx={{ width: '50%', p: 2 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Authors</TableCell>
                        <TableCell>Year born</TableCell>
                        <TableCell>Books writen</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {authors.map((a) => (
                        <TableRow key={a.name}>
                            <TableCell>{a.name}</TableCell>
                            <TableCell>{a.born}</TableCell>
                            <TableCell>{a.bookCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {token && <SetYear authors={authors} />}
        </TableContainer>
    );
};

export default Authors;
