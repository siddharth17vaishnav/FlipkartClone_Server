const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/add',function(req,res){
    const {email,firstname,lastname,addname,statename,cityname,zipname,payment,product,price,imgurl,category} = req.body;
   
    database.query("INSERT INTO orders (email,firstname,lastname,address,state,city,zip,payment,product,price,imgurl,category) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",[email,firstname,lastname,addname,statename,cityname,zipname,payment,product,price,imgurl,category],(err, result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            console.log(result)
            res.send(result)
          
        }
    })
});

router.post("/getall",function(req, res){
    const email=req.body.email;
    database.query("SELECT * FROM orders WHERE email =?",email,(err, result)=>{
        res.send(result)
    })
});

router.get("/getall",function(req, res){
    database.query("SELECT * FROM orders ",(err, result)=>{
        res.send(result)
    })
});

router.delete('/remove/:id',function(req, res){
    const id=req.params.id;
      database.query("DELETE FROM orders WHERE id=?",id,(err,result)=>{
          if(err){
              res.send(err)
          }
          else{
              res.send("Deleted");
          }
      })
  })




module.exports = router;