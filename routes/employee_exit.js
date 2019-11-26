const express  = require('express');
const bodyParser = require('body-parser');
const path  = require('path');
const db = require('../db.js');
const employee_exit  = express.Router();
const lib = require('../lib/lib.js');

employee_exit.use(bodyParser.json());
employee_exit.use(bodyParser.urlencoded({extended:true}));

employee_exit.route('/')

.get(function(req,res,next){
//   res.setHeader('Content-Type','text/html');
   let path_to_directory =  path.dirname(__dirname);
   res.sendFile(path_to_directory + '/public/employee/exit.html');
})
.post(function(req,res,next){
      let date = new Date();
      let values = [req.body.phone_no,date.getCompleteDate(),req.body.exit_gate];
      (async function(){
         try{
            let result = await db.exit(values);
            res.statusCode = 200;
            res.json(result);
         }
         catch(err) {
            res.statusCode = 500;
            res.json({"status":0});
            console.log(__filename + err);                         
         }
         res.end();
      })();

})
.put(function(req,res,next){
   res.statusCode = 500;
   res.json({"status":0});
   res.end();
})
.delete(function(req,res,next){
  res.statusCode = 500;
  res.json({"status":0});
  res.end();
});


module.exports = employee_exit;