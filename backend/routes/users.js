const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  celebrateUpdateUserProfile,
  celebrateUpdateUserAvatar,
} = require('../middleware/celebrate');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', celebrateUpdateUserProfile, updateUserProfile);
router.patch('/me/avatar', celebrateUpdateUserAvatar, updateUserAvatar);
router.get('/:userId', getUserById);

module.exports = router;
