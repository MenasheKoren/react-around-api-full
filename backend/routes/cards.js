const router = require('express').Router();
const auth = require('../middleware/auth');

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

router.get('/', auth, getCards);
router.post('/', celebrateCreateCard, auth, createCard);
router.put('/:cardId/likes', celebrateLikeCard, auth, likeCard);
router.delete('/:cardId/likes', celebrateDislikeCard, auth, dislikeCard);
router.delete('/:cardId', celebrateDeleteCardById, auth, deleteCardById);

module.exports = router;
