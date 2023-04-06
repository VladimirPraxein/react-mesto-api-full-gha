const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');
const Forbidden = require('../errors/forbidden');

const getCards = (req, res, next) => {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((users) => res.send(users))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user;
  const { name, link } = req.body;
  return Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user;
  const { cardId } = req.params;
  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка с указанным _id не найдена.'));
      }
      if (String(card.owner._id) !== owner._id) {
        next(new Forbidden('Невозможно удалить чужую карточку.'));
      }
      return card.remove()
        .then(() => res.send(card));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Передан неккоректный _id.'));
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFound('Передан несуществующий _id карточки.'));
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Передан неккоректный _id.'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFound('Передан несуществующий _id карточки.'));
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Передан неккоректный _id.'));
      }
      next(err);
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
