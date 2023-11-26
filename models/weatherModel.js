const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  townName: String,
  country: String,
  coord: {
    type: {
      type: String,
      default: 'point',
      enum: ['point'],
    },
    lon: Number,
    lat: Number,
  },
  weather: [
    {
      main: String,
      description: String,
      icon: String,
    },
  ],
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
