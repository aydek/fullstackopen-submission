import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createNew = async (data) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
};

const anecdoteService = { getAll, createNew };

export default anecdoteService;
