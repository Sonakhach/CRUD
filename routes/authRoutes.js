const express = require('express');
const router = express.Router();
const { getRegisterPage, getLoginPage ,addNewUser, login, getAdminPage, verifyLogin} = require('../controllers/authController.js');

router.route('/register').get(getRegisterPage).post(addNewUser);

router.route('/login').get(verifyLogin, getLoginPage).post(login);



module.exports = router;