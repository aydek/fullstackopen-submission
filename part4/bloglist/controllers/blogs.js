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
   
    const user = request.user;
    const token = request.token;

    if (!token) response.status(401).json({ error: 'token invalid' });
    if (!user) response.status(401).json({ error: 'user invalid' });

    const authorized = jwt.verify(token, config.SECRET);

    if (!authorized) {
        return response.status(401).json({ error: 'token invalid' });
    }

    const dbUser = await User.findById(user.id);

    const newBlog = {
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        likes: request.body.likes,
        user: dbUser.id,
    };

    const blog = new Blog(newBlog);

    dbUser.blogs = dbUser.blogs.concat(blog._id);
    await dbUser.save();

    const result = await blog.save();
    response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user;
    const token = request.token;

    if (!token) response.status(401).json({ error: 'token invalid' });
    if (!user) response.status(401).json({ error: 'user invalid' });

    const authorized = jwt.verify(token, config.SECRET);

    if (!authorized) {
        return response.status(401).json({ error: 'token invalid' });
    }

    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === user.id) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } else {
        response.status(401).end();
    }
});

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;
    const likes = body.likes;
    const result = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, context: 'query' });
    response.status(200).json(result);
});

module.exports = blogsRouter;
