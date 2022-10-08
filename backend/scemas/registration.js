const mongoose = require('mongoose');
console.log('sss')
const users = new mongoose.Schema({
    name : {
        type:String,
      
    },
    username:{
        type:String,
        
    },
    email : {
        type:String,
        
    },
    companyname : {
        type:String,
      
    },
    phone : {
        type:String,
      
    },
    usertype : {
        type:String,
       
    },
    password : {
        type:String,
      
    }

})
console.log('sdd')
const Register = new mongoose.model("Registration",users);
module.exports = Register;