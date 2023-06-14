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
        addNewComment(state, action) {
            const { id, comments } = action.payload;
            const blog = state.find((item) => item.id === id);
            if (blog) {
                blog.comments = comments;
            }
        },
    },
});

export const { setBlogs, appendBlogs, deleteBlog, increaseLike, addNewComment } = blogSlice.actions;
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

export const addBlog = (title, author, url) => {
    return async (dispatch, getState) => {
        try {
            const user = getState().user;
            const response = await blogService.create(user.token, { title, author, url });
            dispatch(showNotification(`New blog ${response.title} by ${response.author} added..`, 5));
            dispatch(appendBlogs(response));
        } catch (error) {
            dispatch(showNotification(error.response.statusText, 5, 'error'));
        }
    };
};

export const removeBlog = (blog) => {
    return async (dispatch, getState) => {
        try {
            const user = getState().user;
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

export const addCommnet = (id, comment) => {
    return async (dispatch) => {
        try {
            const response = await blogService.comment(id, { comment: comment });
            dispatch(addNewComment(response));
        } catch (error) {
            console.log(error);
        }
    };
};
