import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (token, data) => {
    const response = await axios.post(baseUrl, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const update = async (id, data) => {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
};

const comment = async (id, data) => {
    const response = await axios.put(`${baseUrl}/${id}/comments`, data);
    return response.data;
};

const remove = async (id, token) => {
    const response = await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// eslint-disable-next-line
export default { getAll, create, update, remove, comment };
