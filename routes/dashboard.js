const express = require('express');
const router = express.Router();
const database = require('../config/database');



router.post('/product/create', function(req, res) {
    const {name,price,highlight,category,imgurl} = req.body;

    database.query("INSERT INTO products (name,price,highlight,category,imgurl) VALUES(?,?,?,?,?)",[name,price,highlight,category,imgurl],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("added")
        }
    })
    
    

   
});

router.get('/product/getall', function(req, res){
    database.query("SELECT * FROM products",(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

router.delete('/product/remove/:id',function(req, res){
  const id=req.params.id;
    database.query("DELETE FROM products WHERE id=?",id,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("Deleted");
        }
    })
})

router.get('/getUser', function(req, res) {
    database.query("SELECT * FROM users",(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});



router.get('/dealoftheday', function(req, res){
    database.query("SELECT * FROM products LIMIT 5",(err,result)=>{
        res.send(result);
    })
});

router.get('/topmobiles',function(req, res){
    const category ="mobile";
    database.query("SELECT * FROM products WHERE category=?",category,(err,result)=>{
        res.send(result);
    })
})

router.post('/getproductbyid/:id',function(req, res){
    const id =req.params.id;
    
    database.query("SELECT * FROM products WHERE id=?",id,(err,result)=>{
        res.send(result);
    })
})

router.delete('/user/remove/:id',function(req, res){
    const id=req.params.id;
      database.query("DELETE FROM users WHERE id=?",id,(err,result)=>{
          if(err){
              res.send(err)
          }
          else{
              res.send("Deleted");
          }
      })
  })

  router.post('/auth',function(req, res){
      const email=req.body.email;
      database.query("SELECT * FROM users WHERE email=?",email,(err,result)=>{
          res.send(result);
      })
  })




module.exports = router;