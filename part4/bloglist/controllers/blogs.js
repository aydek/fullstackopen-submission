const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

blogsRouter.get('/:id', async (request, response) => {
    const result = await Blog.findById(request.params.id);
    response.json(result);
});

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(result);
});

blogsRouter.post('/', async (request, response) => {
    if (!request.body.url || !request.body.title) {
        return response.status(400).end();
    }

    const token = jwt.verify(request.token, config.SECRET);
    console.log(token);
    if (!token.id) {
        return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(token.id);

    const newBlog = {
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        likes: request.body.likes,
        user: user.id,
    };

    const blog = new Blog(newBlog);

    user.blogs = user.blogs.concat(blog._id);
    await user.save();

    const result = await blog.save();
    response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;
    const likes = body.likes;
    const result = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, context: 'query' });
    response.status(200).json(result);
});

module.exports = blogsRouter;
