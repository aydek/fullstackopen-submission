import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toggable from './Toggable';
import { addBlog } from '../reducers/blogReducer';
import AddBlogForm from './AddBlogForm';
import { List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Bloglist = () => {
    const blogFormRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNewBlog = (title, author, url) => {
        blogFormRef.current.toggleVisibility();
        dispatch(addBlog(title, author, url));
    };

    const blogs = useSelector((state) => state.blogs);
    return (
        <Paper sx={{ width: '100%', p: 1, mt: 2 }}>
            <Toggable label="New Blog" show={false} hideLabel="Cancel" ref={blogFormRef}>
                <AddBlogForm handleNewBlog={handleNewBlog} />
            </Toggable>
            <List>
                {blogs
                    .slice()
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <ListItem key={blog.id}>
                            <ListItemButton onClick={() => navigate(`/blogs/${blog.id}`)}>
                                <ListItemText primary={`${blog.title} ${blog.author}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Paper>
    );
};

export default Bloglist;
