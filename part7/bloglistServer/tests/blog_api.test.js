const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const { blogs } = require('../utils/list_helper');

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
});

test('verify id property', async () => {
    const response = await api.get('/api/blogs');
    for (const blog of response.body) {
        expect(blog.id).toBeDefined();
    }
});

describe('when theres blogs saved', () => {
    test('blogs returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(blogs.length);
    });

    test('a specific blog link is within the returned blogs', async () => {
        const response = await api.get('/api/blogs');
        const contents = response.body.map((r) => r.url);
        expect(contents).toContain('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html');
    });
});

describe('viewing specific blog', () => {
    test('valid id', async () => {
        const response = await api.get('/api/blogs');
        const currentBlog = response.body[0];

        const resultBlog = await api
            .get(`/api/blogs/${currentBlog.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(resultBlog.body).toEqual(currentBlog);
    });

    test('status 400 invalid id', async () => {
        const invalidId = 'some_invalid_id';

        await api.get(`/api/notes/${invalidId}`).expect(404);
    });
});

describe('adding new blog', () => {
    test('when wrong token provided', async () => {
        const newBlog = {
            title: 'Test for me',
            author: 'Kestutis Duoba',
            url: 'http://google.com',
            likes: 99,
        };
        const token = 'Some wrong token';
        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(401);
    });
    test('successfully added blog', async () => {
        const newBlog = {
            title: 'Test for me',
            author: 'Kestutis Duoba',
            url: 'http://google.com',
            likes: 99,
        };

        const user = await User.findOne({ username: 'default' });

        const userForToken = {
            username: 'default',
            id: user.id,
        };

        const token = jwt.sign(userForToken, config.SECRET);

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');
        const contents = response.body.map((res) => res.author);

        expect(response.body).toHaveLength(blogs.length + 1);
        expect(contents).toContain('Kestutis Duoba');
    });

    test('bad request adding blog', async () => {
        const newBlog = {
            author: 'Kestutis Duoba',
            likes: 2,
        };

        await api.post('/api/blogs').send(newBlog).expect(400);
    });

    test('likes missing from the request', async () => {
        const newBlog = {
            title: 'Likes missing',
            author: 'Kestutis Duoba',
            url: 'http://google.com',
        };

        const user = await User.findOne({ username: 'default' });

        const userForToken = {
            username: 'default',
            id: user.id,
        };

        const token = jwt.sign(userForToken, config.SECRET);

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');

        expect(response.body[blogs.length].likes).toEqual(0);
    });
});

describe('when deleting blog', () => {
    test('succesfully delete blog with existing id', async () => {
        const user = await User.findOne({ username: 'default' });

        const userForToken = {
            username: 'default',
            id: user.id,
        };

        const token = jwt.sign(userForToken, config.SECRET);

        const response = await api.get('/api/blogs');
        await Blog.findByIdAndUpdate(response.body[0].id, { user: user.id });
        await api.delete(`/api/blogs/${response.body[0].id}`).set('Authorization', `Bearer ${token}`).expect(204);
    });

    test('invalid id', async () => {
        const user = await User.findOne({ username: 'default' });

        const userForToken = {
            username: 'default',
            id: user.id,
        };

        const token = jwt.sign(userForToken, config.SECRET);

        const invalidID = 'some_invalid_id';
        await api.delete(`/api/blogs/${invalidID}`).set('Authorization', `Bearer ${token}`).expect(400);
    });
});

describe('when updating blog', () => {
    test('succesfully update blog with existing id', async () => {
        const response = await api.get('/api/blogs');
        const updated = await api
            .put(`/api/blogs/${response.body[0].id}`)
            .send({ likes: 0 })
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(updated.body.likes).toEqual(0);
    });

    test('invalid id', async () => {
        const invalidID = 'some_invalid_id';
        await api.put(`/api/blogs/${invalidID}`).send({ likes: 0 }).expect(400);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
