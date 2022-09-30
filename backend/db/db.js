const mongoose = require('mongoose');
mongoose.connect('mongodb://82.180.137.231/:27017/photography',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(()=>{
    console.log('connection sucess')
}).catch((e)=>{
    console.log(e)
})