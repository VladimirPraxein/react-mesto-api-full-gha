const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');
const Conflict = require('../errors/conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

function findUser(userId, res) {
  return User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFound('Пользователь по указанному _id не найден.');
    });
}

const getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFound('Пользователь по указанному _id не найден.');
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Передан невалидный _id пользователя.'));
      } else {
        next(err);
      }
    });
};

const getMe = (req, res, next) => {
  findUser(req.user._id, res)
    .catch(next);
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Такой пользователь уже существует.'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

const updateUser = (dataUser, req, res, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, dataUser, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFound('Передан несуществующий _id.'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  updateUser({ name, about }, req, res, next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUser({ avatar }, req, res, next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers, getUser, createUser, updateUserInfo, updateUserAvatar, login, getMe,
};
