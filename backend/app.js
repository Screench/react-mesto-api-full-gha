require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middleware/rateLimit');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require ('./middleware/logger');
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://mestorussia.nomoreparties.co', 'http://mestorussia.nomoreparties.co', 'https://api.mestorussia.nomoreparties.co', 'http://api.mestorussia.nomoreparties.co'],
  credentials: true,
}));

mongoose.connect(DB_URL);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер подвергается краш тесту');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Прослушивание порта: ${PORT}`);
});
