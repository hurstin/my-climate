const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('connected to DATABASE...');
  },
);

const app = require('./app');

console.log(app.get('env'));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on ${port}`); // eslint-disable-line no-console
});
