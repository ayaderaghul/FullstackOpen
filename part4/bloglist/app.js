const express = require('express');
const app = express();
const blogsRouter = require('./routes/blogs');
const middleware = require('./utils/middleware');

app.use(express.json());
app.use(middleware.logger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;