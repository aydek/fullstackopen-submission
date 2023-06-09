const logger = require('./logger');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

const tokenExtractor = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);

        request.token = token;
    }

    next();
};

const userExtractor = async (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (authHeader) {
        const token = authHeader.substring(7);
        try {
            const decoded = jwt.verify(token, config.SECRET);

            request.user = decoded;
        } catch (error) {
            logger.error(error);
        }
    }
    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
};
