const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../key")
const requireLogin = require('../middleware/requireLogin')



router.post("/signup",(req,res) => {
    const {name,email,password,pic} = req.body
    if(!email || !password || !name){
      return res.status(422).json({error:"plaese add the all field"})
    }
  User.findOne({email:email})
  .then((saveUser)=>{
     if(saveUser){
      return res.json({error:"user already exist this email"})
     }
     bcrypt.hash(password,12)
     .then((hashedpassword)=>{
      const register = new User({
        email,
        password:hashedpassword,
        name,
        pic
      })
      register.save()
      .then((user)=>{
           res.json({message:"saved successfully"})
      }).catch((err)=>{
        console.log(err)

      })
     })
     
  }).catch((err)=>{
      console.log(err)
  })
 
})

router.post("/signin",(req,res)=>{
  const {email,password} = req.body
  if( !email || !password){
     return res.status(422).json({error:"plz fill  email and password"})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
      if(!savedUser){
       return res.status(422).json({error:"plz fill the valid email and password"})
      }
      bcrypt.compare(password,savedUser.password)
      .then((dataMatch)=>{
           if(dataMatch){
             //res.status(201).json("user successful signin")
             const token = jwt.sign({_id:savedUser._id},  JWT_SECRET)
             const {_id,name,email,follower,following,pic} = savedUser
             res.json({token,user:{_id,name,email,follower,following,pic}})
           }else{
            return res.status(402).json({error:"plz fill the valid email and password"})
           }
      }).catch((error)=>{
          console.log(error)
      })
  })
})

module.exports = router