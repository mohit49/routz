const express = require("express");
const app = express();
const http = require("http").Server(app);
app.use(express.json({limit: '50mb'}));

app.post('/register',function(req,res){
  console.log(req.body)
});



http.listen(3004, function() {
  console.log("listening on *:4000");
});