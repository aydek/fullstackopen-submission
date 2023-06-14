import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommnet } from '../reducers/blogReducer';
import { Box, Button, TextField } from '@mui/material';

const AddComment = ({ id }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(addCommnet(id, comment));
        setComment('');
    };
    return (
        <Box component="form" onSubmit={submitForm} display={'flex'} sx={{ maxWidth: 'xs' }}>
            <TextField label="Comment" name="comment" autoComplete="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button sx={{ ml: 1 }} type="submit" variant="outlined">
                Add
            </Button>
        </Box>
    );
};

export default AddComment;
