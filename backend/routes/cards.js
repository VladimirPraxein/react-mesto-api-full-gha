const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlPattern, idPattern } = require('../utils/constants');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().min(2).pattern(urlPattern),
    }),
  }),
  createCard,
);
cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().pattern(idPattern),
    }),
  }),
  deleteCard,
);
cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().pattern(idPattern),
    }),
  }),
  likeCard,
);
cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().pattern(idPattern),
    }),
  }),
  dislikeCard,
);

module.exports = cardsRouter;
