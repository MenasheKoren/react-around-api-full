const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  celebrateCreateCard,
  celebrateDeleteCardById,
  celebrateLikeCard,
  celebrateDislikeCard,
} = require('../middleware/celebrate');

router.get('/', getCards);
router.post('/', celebrateCreateCard, createCard);
router.delete('/:cardId', celebrateDeleteCardById, deleteCardById);
router.put('/:cardId/likes', celebrateLikeCard, likeCard);
router.delete('/:cardId/likes', celebrateDislikeCard, dislikeCard);

module.exports = router;
