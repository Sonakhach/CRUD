const mongoose = require ('mongoose');
const joi = require('@hapi/joi');

const registerValidation = (data) => {
//control for browser
  const schema = joi.object({
    name:joi.string().min(6).max(255).required(),
    email:joi.string().min(6).max(255).required().email(),
    password:joi.string().min(6).max(255),
  });
  return schema.validate(data);
};

//control for mongoDatabase
const schema = new mongoose.Schema({
  name: {
    type: String
  },
   email: {
    type: String,
    unique:true,
    required:true,
  },
   password: {
    type: String
  },

});


const users = mongoose.model('users', schema);


module.exports= 
{
 registerValidation,
 users
}