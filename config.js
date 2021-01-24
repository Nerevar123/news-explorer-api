const {
  PORT = 3000,
  JWT_SECRET = 'JWT_SECRET',
  MONGO_URL = 'mongodb://localhost:27017/news',
  COOKIES_SECURE = false,
  COOKIES_SAMESITE = 'Lax',
} = process.env;

const rateLimitConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

const corsConfig = {
  origin: ['https://news.ner.works', 'http://news.ner.works', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
};

module.exports = {
  PORT, JWT_SECRET, MONGO_URL, COOKIES_SECURE, COOKIES_SAMESITE, rateLimitConfig, corsConfig,
};
