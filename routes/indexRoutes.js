

const express = require('express');
const router = express.Router();

const { getAllArticles } = require('../controllers/indexController.js');
router.route('/')
   .get(getAllArticles)


module.exports = router;