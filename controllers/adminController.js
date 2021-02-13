const Page = require('../models/pageModel');
const fs=require('fs')


class adminController{
 //Admin page view
 getAdminPage (req,res){
       Page.find().select({__v:0}).exec((err,result) => {
        if (err) throw err;
            console.log(result)

           res.render('admin',{result:result})
        
    })
  
}


 
   
  //get Article for view

   getArticle(req,res){
	   let id=req.params.pxic
	   Page.findOne({ _id: id }).then((page)=>{
	           console.log(page)
	          return res.render('adminGetArticle', {page:page})
	    })

   }


   
   


    //view new article page
    createArticlePage(req,res){
   	 
   	 res.render('adminCreateArticle')
    } 

	// create and save new article 
	saveNewArticle(req, res){
	    
	    
          const newArticle =new Page({ 
                        title:req.body.title,
                        description:req.body.description,
                        content:req.body.content,
                        imgname:req.file.filename,

                      })
          newArticle.save().then(() => {
               console.log('new Article saved');
               return res.redirect('/admin')
            }).catch(err=>{
            	console.log(err)
            	return res.redirect('/admin/adminCreateArticle')
            })
          
	  
	}
	// deleted Article
	deleteArticle(req, res){
		Page.deleteOne(req.body).then((info)=>{
		 console.log(info)
		 return res.json(info)
	    })
    } 

  //view article page for update
    articleUpdatePage(req, res){
       let id=req.params.pxic
	   Page.findOne({ _id: id }).then((page)=>{
	           console.log(page)
	          return res.render('adminUpdateArticle', {page:page})
	    })	
          
   } 	
	//save Updated Article
    saveUpdatedArticle(req, res){

      let imgName=""
      let file=req.file
       if(file){
        imgName=file.filename
        try{

            fs.unlinkSync(__dirname+'/../public/images/'+req.body.imgname)
        }
        catch(err){
             console.log(err)
        }
      
       }else{
        imgName=req.body.imgname
       }
   
         Page.updateOne({_id: req.body.id},{ 
         	 title:req.body.title,
            description:req.body.description,
            content:req.body.content,
            imgname:imgName,

          }).then((info)=>{

              console.log('Article updated', info);
              return res.redirect('/admin')                        
          });
         
  
   }


  

}



module.exports = new adminController()

