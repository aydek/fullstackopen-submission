import Toggable from './Toggable';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const likeBlog = async () => {
        try {
            const response = await blogService.update(blog.id, { likes: blog.likes + 1 });
            const index = blogs.findIndex((val) => val.id === response.id);
            const copy = blogs;
            copy[index] = response;
            setBlogs([...copy]);
        } catch (error) {
            console.error(error);
        }
    };

    const removeBlog = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                await blogService.remove(blog.id, user.token);
                const updated = blogs.filter((val) => val.id !== blog.id);
                setBlogs([...updated]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div style={blogStyle}>
            {blog.title}
            <Toggable label="View" show={false} buttonAtTop={true}>
                <div>{blog.url}</div>
                <div>
                    likes{blog.likes}
                    <button onClick={likeBlog}>like</button>
                </div>
                <div>{blog.author}</div>
                {blog.user && blog.user.username === user.username ? <button onClick={removeBlog}>Delete</button> : null}
            </Toggable>
        </div>
    );
};

export default Blog;
