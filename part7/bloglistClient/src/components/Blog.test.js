import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';

test('renders title and author', () => {
    const blog = {
        title: 'Component testing',
        author: 'Author',
    };

    render(<Blog blog={blog} user={{}} handleLike={() => false} handleRemove={() => false} />);

    const element = screen.getByText('Component testing');
    const element1 = screen.getByText('Author');
    expect(element).toBeDefined();
    expect(element1).toBeDefined();
});

test('renders url and likes', async () => {
    const blog = {
        title: 'Component testing',
        author: 'Author',
        url: 'https://google.com',
        likes: 1,
    };

    render(<Blog blog={blog} user={{}} handleLike={() => false} handleRemove={() => false} />);

    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    const element = screen.getByText('https://google.com');
    const element1 = screen.getByText('1');
    expect(element).toBeDefined();
    expect(element1).toBeDefined();
});

test('calls the event handler twice when the like button is clicked twice', async () => {
    const blog = {
        title: 'Component testing',
        author: 'Author',
        url: 'https://google.com',
        likes: 1,
    };

    const mockLikeHandler = jest.fn();

    render(<Blog blog={blog} user={{}} handleRemove={() => false} handleLike={mockLikeHandler} />);

    const user = userEvent.setup();
    let button = screen.getByText('View');
    await user.click(button);
    button = screen.getByText('like');
    await user.click(button);
    await user.click(button);

    expect(mockLikeHandler).toHaveBeenCalledTimes(2);
});

test('calls the event handler with the right details when a new blog is created', async () => {
    const mockCreateBlog = jest.fn();

    render(<AddBlogForm handleNewBlog={mockCreateBlog} />);

    const user = userEvent.setup();

    const inputs = screen.getAllByRole('textbox');

    await user.type(inputs[0], 'Test Blog');
    await user.type(inputs[1], 'John Doe');
    await user.type(inputs[2], 'https://example.com');

    await user.click(screen.getByText('Create'));

    expect(mockCreateBlog).toHaveBeenCalledTimes(1);
    expect(mockCreateBlog).toHaveBeenCalledWith('Test Blog', 'John Doe', 'https://example.com');
});
