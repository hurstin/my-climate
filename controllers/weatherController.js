// const { promisify } = require('util');
// const User = require('../models/userModel');
const Weather = require('../models/weatherModel');
const catchAsync = require('./catchAsync');
// const jwt = require('jsonwebtoken');

exports.getData = (req, res, next) => {
  console.log('we on track');
  res.status(201).json({
    message: 'Welcome to the API',
  });
};

exports.getCurrentLocation = catchAsync(async (req, res, next) => {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=53.120300&lon=-2.121158&appid=${process.env.WEATHER_KEY}`,
  );
  const response = await weather.json();
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  console.log(req.ip);

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
  next();
});

// const loc = navigator.geolocation.getCurrentPosition(function (position) {
//   const latitude = position.coords.latitude;
//   const longitude = position.coords.longitude;
//   console.log(longitude, latitude);
// });
// console.log(loc);

// console.log(navigator);
