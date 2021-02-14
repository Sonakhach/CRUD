const config = require("../config/");
const Page = require('../models/pageModel');

class indexController{
	getLandingPage(req,res){
		res.render('landing')
	}
// appears on landing page
	 getAllArticles(req,res){      
      Page.find().sort({}).then((pages)=>{
       console.log(pages)
       res.render('landing',{pages:pages});
    })

   }
}


module.exports = new indexController();
