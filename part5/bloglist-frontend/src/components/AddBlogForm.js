import React, { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const AddBlogForm = ({ user, blogs, setBlogs, setNotification, blogFormRef }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const newBlog = async (event) => {
        event.preventDefault();
        try {
            const response = await blogService.create(user.token, { title, author, url });
            setBlogs([...blogs, response]);
            setNotification(`New blog ${response.title} by ${response.author} added..`);
            setTitle('');
            setUrl('');
            setAuthor('');
            blogFormRef.current.toggleVisibility();
        } catch (error) {
            setNotification(error.response.data.error, 'error');
        }
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
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired,
    blogFormRef: PropTypes.any.isRequired,
};
