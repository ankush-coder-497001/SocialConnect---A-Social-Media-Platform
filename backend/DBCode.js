const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// DB connection
mongoose.connect(process.env.DBURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  module.exports = mongoose;


  //not in use ... currently