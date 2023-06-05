const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/:id', async (request, response) => {
    const result = await Blog.findById(request.params.id);
    response.json(result);
});

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({});
    response.json(result);
});

blogsRouter.post('/', async (request, response) => {
    if (!request.body.url || !request.body.title) {
        return response.status(400).end();
    }
    const blog = new Blog(request.body);
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
