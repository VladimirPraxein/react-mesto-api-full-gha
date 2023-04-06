const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlPattern, idPattern } = require('../utils/constants');

const {
  getUsers, getUser, getMe, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);
usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().pattern(idPattern),
    }),
  }),
  getUser,
);
usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserInfo,
);
usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().min(2).pattern(urlPattern),
    }),
  }),
  updateUserAvatar,
);

module.exports = usersRouter;
