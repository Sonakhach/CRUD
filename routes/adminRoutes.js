const multer = require('multer');
const express = require('express');
const router = express.Router();
const {createArticlePage,getAdminPage, saveNewArticle, deleteArticle, articleUpdatePage, saveUpdatedArticle, getArticle, getAllArticles} = require('../controllers/adminController.js');
const {getLandingPage} = require('../controllers/indexController.js');
const {verifyToken} = require('../controllers/authController.js');

router.route('/', verifyToken).get(getAdminPage);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

let upload = multer({ storage: storage })

router.route('/article/:pxic')
   .get(getArticle)
   

router.route('/article',verifyToken)   
   .delete(deleteArticle)

router.route('/adminCreateArticle',verifyToken)
   .get(createArticlePage)
   .post(upload.single('myImgFileName'),saveNewArticle)


router.route('/adminUpdateArticle/:pxic')
   .get(articleUpdatePage)

router.route('/adminUpdateArticle/', verifyToken)   
   .post(upload.single('myImgFileName'),saveUpdatedArticle)

   router.get("/logout", (req,res)=>{
    res.clearCookie('x-access-token')
    res.redirect('/')
  });

module.exports = router;