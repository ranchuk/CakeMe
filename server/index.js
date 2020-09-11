const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const routes = require('./routes/routes');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
connectDB();

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));