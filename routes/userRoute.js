const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUser);

router.route('/signup').post(authController.signup);

router.route('/login').post(authController.login);

router.route('/forgotPassword').post(authController.forgotPassword);

router.route('/resetPassword/:token').patch(authController.resetPassword);

router.patch('/updatePassword', authController.updatePassword);
router
  .route('/:id')
  .get(userController.oneUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser,
  )
  .patch(userController.updateUser);

module.exports = router;
