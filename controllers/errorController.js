const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const sendDErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendDErrorProd = (err, res) => {
  // operational , trusted error, sent mgs to clinet
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // programming or unknown error,
  } else {
    // 1) Log error
    // console.error('Error!', err);

    // 2 ) generaic Error
    res.status(500).json({
      status: 'Error',
      message: 'something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    const { name } = err;
    let error;
    if (name === 'CastError') error = handleCastErrorDB(err);

    sendDErrorProd(error, res);
  }
};
