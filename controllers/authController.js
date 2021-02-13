const model =  require('../models/userTableCreator.js');
const pageModel = require('../models/pageModel.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require("../config/");

const salt = 10;
class AuthController{

  //Register page view
	getRegisterPage(req,res){
		let message = ''
		res.render('register',{message:'Register page'})
	}

 //Login page view
	getLoginPage(req,res) {
    let message = ''
	   res.render('login', {message:'Login page'})
	}
  
// we are creating new user in our list
	addNewUser (req,res) {
    
		if(!model.registerValidation(req.body).error){

		bcrypt.hash(req.body.password, salt, function(err, hash) {

	    model.users.create({name:req.body.name,
		              email:req.body.email,
		              password:hash},
		              (err,result) => {	
	        	if (err) console.log(err);
	        	console.log('Done');
	            // res.json(result);	            
	            res.redirect('/auth/login');
	        })

	});
		
	}
	else {
   
    res.write(model.registerValidation(req.body).error.details[0].message),res.end()
    console.log(error.details)
  }
	}


	//Login 

 login (req,res){
   
     model.users.findOne({email:req.body.email}).exec((err,result) => {
     	if (err) throw err;

     	if(result) {
     		console.log(result) 
     	bcrypt.compare(req.body.password, result.password, function(err, result1) {
         console.log(result1)   
        if (result1) {
              var token = jwt.sign({ id: model.users.id }, config.secret, {
                expiresIn:"1d" // 24 hours
              });      
      
                res.cookie("x-access-token", token).status(200)
                // res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true }) maxAge
                // res.cookie("x-access-token", token, { maxAge: 30*24*60*60*1000, httpOnly: true }).status(200)
              
            	res.redirect('/admin');
                 

            }
            else {
            	res.send('No such a user');            
            }
        });
     	}
     
     })
}

//verify token middleware


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.cookies["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};



}
 
module.exports = new AuthController();