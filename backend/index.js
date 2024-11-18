const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load config
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.DBURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const PORT = process.env.PORT || 7001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
