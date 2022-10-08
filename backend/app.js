const express = require("express");
const app = express();
app.use(express.json());
app.post('/register',function(req,res){
  console.log(req.body)
});

app.listen(3004,function(){
  console.log('ssss')
})