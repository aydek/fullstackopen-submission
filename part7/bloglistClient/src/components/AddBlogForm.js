import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddBlogForm = ({ handleNewBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const newBlog = (event) => {
        event.preventDefault();
        handleNewBlog(title, author, url);
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <form onSubmit={newBlog}>
            <h1>Create new</h1>
            <div>
                Title:
                <input type="text" name="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                Author:
                <input type="text" name="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
                URL:
                <input type="text" name="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default AddBlogForm;

AddBlogForm.propTypes = {
    handleNewBlog: PropTypes.func.isRequired,
};
