const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');
const auth = require('../middlewares/auth');
const { register, login, logout } = require('../controllers/users');
const { validateLoginBody, validateRegisterBody } = require('../middlewares/validations');

router.post('/signin', validateLoginBody, login);
router.post('/signup', validateRegisterBody, register);

router.use(auth);

router.use('/users', userRouter);
router.use('/articles', articleRouter);

router.use('/logout', logout);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
