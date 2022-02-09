const router = require('express').Router();
const auth = require('../middleware/auth');

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

router.get('/', auth, getUsers);
router.get('/me', auth, getCurrentUser);
router.patch('/me', celebrateUpdateUserProfile, auth, updateUserProfile);
router.patch('/me/avatar', celebrateUpdateUserAvatar, auth, updateUserAvatar);
router.get('/:userId', auth, getUserById);

module.exports = router;
