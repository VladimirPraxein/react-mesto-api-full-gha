const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const { urlPattern } = require('../utils/constants');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const NotFound = require('../errors/notFound');

router.post('/sign-in', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/sign-up', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);

router.use(auth);

router.use('/users', usersRouter);

router.use('/cards', cardsRouter);

router.use('*', (req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден.'));
});

module.exports = router;
