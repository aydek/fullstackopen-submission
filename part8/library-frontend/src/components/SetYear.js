import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Container, FormControl, InputLabel, TextField, Typography } from '@mui/material';

const SetYear = ({ authors }) => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const updateAuthor = () => {
        if (name.length < 3 || year.length < 4 || year.length > 4) return;
        
    };

    return (
        <Container sx={{ mt: 3 }}>
            <Typography variant="h5">Set birthyear</Typography>
            <FormControl sx={{ width: 250, mt: 1 }}>
                <InputLabel id="Author">Author</InputLabel>
                <Select value={name} labelId="Author" label="Author" onChange={handleChange}>
                    {authors.map((author) => (
                        <MenuItem key={author.name} value={author.name}>
                            {author.name}
                        </MenuItem>
                    ))}
                </Select>
                <TextField label="Year" type="number" value={year} onChange={(e) => setYear(e.target.value)} sx={{ my: 1 }} />
                <Button fullWidth variant="outlined" onClick={updateAuthor}>
                    Update author
                </Button>
            </FormControl>
        </Container>
    );
};

export default SetYear;
