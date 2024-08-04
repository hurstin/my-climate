// bug to be fitted for production mode

const AppError = require('../appError');

const handleDuplicateFieldsDB = (err) => {
  console.log(err);
  let value;
  const dupField = Object.values(err.keyValue);
  for (var i = 0; i < dupField.length; i++) {
    value = dupField[i];
  }

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // operational,trusted error:send message to client
  if (err.isOPerational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming or other unknown error:dont leak err details
  } else {
    // log error
    console.error('ERROR', err);

    // send generic error
    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.code === 11000) {
      console.error(error.code);
      handleDuplicateFieldsDB(error);
    }
    sendErrorProd(error, req, res);
  }
};
