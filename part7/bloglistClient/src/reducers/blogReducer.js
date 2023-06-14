/* eslint-disable indent */
import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { showNotification } from './notificationReducer';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload;
        },

        appendBlogs(state, action) {
            state.push(action.payload);
        },

        deleteBlog(state, action) {
            console.log(action.payload);
            const { id } = action.payload;
            state.splice(
                state.findIndex((blog) => blog.id === id),
                1
            );
        },

        increaseLike(state, action) {
            const { id } = action.payload;
            const blog = state.find((item) => item.id === id);
            if (blog) {
                blog.likes++;
            }
        },
    },
});

export const { setBlogs, appendBlogs, deleteBlog, increaseLike } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll();
            dispatch(setBlogs(blogs));
        } catch (error) {
            console.log(error);
        }
    };
};

export const addBlog = (user, title, author, url) => {
    return async (dispatch) => {
        try {
            const response = await blogService.create(user.token, { title, author, url });
            dispatch(showNotification(`New blog ${response.title} by ${response.author} added..`, 5));
            dispatch(appendBlogs(response));
        } catch (error) {
            dispatch(showNotification(error.response.statusText, 5, 'error'));
        }
    };
};

export const removeBlog = (blog, user) => {
    return async (dispatch) => {
        try {
            await blogService.remove(blog.id, user.token);
            dispatch(deleteBlog(blog));
        } catch (error) {
            console.log(error);
        }
    };
};

export const addLike = (blog) => {
    return async (dispatch) => {
        try {
            const response = await blogService.update(blog.id, { likes: blog.likes + 1 });
            dispatch(increaseLike(response));
        } catch (error) {
            console.log(error);
        }
    };
};
