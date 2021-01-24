require('dotenv-flow').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  PORT, MONGO_URL, rateLimitConfig,
} = require('./config');

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const limiter = rateLimit(rateLimitConfig);

// app.use(cors(corsConfig));

app.use(cors({
  origin: ['https://news.ner.works', 'http://news.ner.works', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
