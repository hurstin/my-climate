// const { promisify } = require('util');
// const User = require('../models/userModel');
const geoip = require('geoip-lite');
const Weather = require('../models/weatherModel');
const catchAsync = require('./catchAsync');
const AppError = require('../appError');

exports.getData = (req, res, next) => {
  console.log('we on track');
  res.status(201).json({
    message: 'Welcome to the API',
  });
};

exports.getCurrentLocation = catchAsync(async (req, res, next) => {
  const ip =
    req.headers['cf-connecting-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    '';

  if (!ip) return next(new AppError('ip address not found, try again', 401));

  const location = geoip.lookup(ip);
  const [lat, lon] = location.ll;

  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}`,
  );
  // const weather = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?lat=53.120300&lon=-2.121158&appid=${process.env.WEATHER_KEY}`,
  // );
  const response = await weather.json();
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  const newWeather = await Weather.create({
    townName: response.name,
    coord: response.coord,
    weather: response.weather,
    country: regionNames.of(response.sys.country),
  });
  res.status(201).json({
    status: 'success',
    data: newWeather,
  });
});
