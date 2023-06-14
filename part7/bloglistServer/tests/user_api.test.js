const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');
const User = require('../models/user');

beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('somepassword', 10);
    const user = new User({ username: 'default', passwordHash });
    await user.save();
});

describe('when theres one user', () => {
    test('successfully created user', async () => {
        const usersBefore = await api.get('/api/users');

        const newUser = {
            username: 'aydek',
            name: 'Kestutis Duoba',
            password: 'somepassword',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAfter = await api.get('/api/users');
        expect(usersAfter.body).toHaveLength(usersBefore.body.length + 1);

        const usernames = usersAfter.body.map((user) => user.username);
        expect(usernames).toContain(newUser.username);
    });

    test('when username already taken', async () => {
        const newUser = {
            username: 'default',
            name: 'default name',
            password: 'defaultpass',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('expected `username` to be unique');
    });

    test('when password too short', async () => {
        const newUser = {
            username: 'default',
            name: 'default name',
            password: 'aa',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('password too short');
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
