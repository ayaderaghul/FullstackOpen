const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted id' });
  }
  
  next(error);
};

module.exports = {
  logger,
  unknownEndpoint,
  errorHandler
};