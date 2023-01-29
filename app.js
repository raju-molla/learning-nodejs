const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/userRoutes');

// MIDDLESWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// server
module.exports = app;
