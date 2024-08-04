const express = require('express');

const morgan = require('morgan');
const AppError = require('./appError');
const globalErrorHandler = require('./controllers/errorController');
const weatherRouter = require('./routes/weatherRoute');
const userRouter = require('./routes/userRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/weathers', weatherRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
