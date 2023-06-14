import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addLike, removeBlog } from '../reducers/blogReducer';
import BlogComments from './BlogComments';
import { Box, Button, Link, Paper, Typography } from '@mui/material';

const Blog = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const blogs = useSelector((state) => state.blogs);

    const blog = blogs.find((blog) => blog.id === id);

    if (!blog) return;

    const handleLike = (blog) => {
        dispatch(addLike(blog));
    };

    const handleRemove = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(removeBlog(blog));
            navigate('/');
        }
    };

    return (
        <Paper className="blog" sx={{ p: 2, mt: 2 }}>
            <Typography variant="h4">
                {blog.title} by {blog.author}
            </Typography>
            <Link href={blog.url}>{blog.url}</Link>
            <Box display={'flex'} alignItems={'center'}>
                <Typography>
                    Likes: <strong>{blog.likes}</strong>
                </Typography>
                <Button onClick={() => handleLike(blog)}>like</Button>
            </Box>
            <Typography>
                Added by: <strong>{blog.user && blog.user.name}</strong>
            </Typography>
            {blog.user && blog.user.username === user.username ? (
                <Button variant="outlined" onClick={() => handleRemove(blog)}>
                    Delete
                </Button>
            ) : null}
            <BlogComments blog={blog} />
        </Paper>
    );
};

export default Blog;
