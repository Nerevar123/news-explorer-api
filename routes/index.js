const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');
const { ERROR_CODE_404, errorMessage404 } = require('../utils/errors');
const auth = require('../middlewares/auth');
const {
  createUser, login, logout, checkCookies,
} = require('../controllers/users');
const { validateUserBody } = require('../middlewares/validations');

router.post('/signin', validateUserBody, login);
router.post('/signup', validateUserBody, createUser);

router.use(auth);

router.get('/check', checkCookies);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

router.use('/logout', logout);

router.use('*', (req, res) => {
  res.status(ERROR_CODE_404).send({ message: errorMessage404 });
});

module.exports = router;
