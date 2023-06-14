import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommnet } from '../reducers/blogReducer';

const AddComment = ({ id }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(addCommnet(id, comment));
        setComment('');
    };
    return (
        <form onSubmit={submitForm}>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}></input>
            <button>add comment</button>
        </form>
    );
};

export default AddComment;
