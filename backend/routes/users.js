const router = require('express').Router();
const {
  getUsers,
  getUserById,
  // createUser,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
// router.post('/', createUser);
router.get('/:userId', getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
