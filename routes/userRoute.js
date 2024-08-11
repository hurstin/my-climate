const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(authController.protect, userController.getAllUser);

router.route('/signup').post(authController.signup);

router.route('/login').post(authController.login);

router.route('/forgotPassword').post(authController.forgotPassword);

router.route('/resetPassword/:token').patch(authController.resetPassword);

router
  .route('/updateMe')
  .patch(authController.protect, userController.updateMe);

router
  .route('/deleteMe')
  .delete(authController.protect, userController.deleteMe);

router
  .route('/updateMyPassword')
  .patch(authController.protect, authController.updatePassword);
router
  .route('/:id')
  .get(userController.oneUser)
  .delete(authController.protect, authController.restrictTo('admin'));

module.exports = router;
