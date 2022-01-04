const express = require('express');
const router = express.Router();
const database = require('../config/database');
const bcrypt = require('bcrypt');

router.post('/register',function(req,res){
    const email = req.body.email;
    const password = req.body.password;

            bcrypt.hash(password,10).then((hash)=>{
                database.query("INSERT INTO users (email,password) VALUES(?,?)",[email,hash],(err,result)=>{
                    if(err){
                            res.json(err)
                    }else{
                        res.json("Successfully Registered");
                        
                    }
                })
            })
        
});


router.post('/login',function(req,res){
    const email = req.body.email;
    const password = req.body.password;

   
    database.query("SELECT * FROM users WHERE email=?",email,(err,result)=>{
       
        bcrypt.compare(password,result[0].password,(errors,response)=>{
            if(response){
                res.json("success")
            }
            else{
                res.json("error")
                
            }
        });
    });
    });



router.put('/additional',function(req,res){
    const email=req.body.email;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const mobile = req.body.mobile;
    console.log(req.body)

    database.query("UPDATE users SET mobile = ? , firstname=?,lastname=? WHERE email = ?",[mobile,firstname,lastname,email],(err,result)=>{
        if(err){
            res.send("err");
        }
        else{
            res.send("success")
        }
    })
})

router.post('/profile',function(req,res){
    const email = req.body.email;
    database.query("SELECT * FROM users WHERE email = ?",email,(err,result)=>{
       if(err){
           res.send(err);
       }
       else{
           res.send(result)
       }
    })
})

module.exports = router;