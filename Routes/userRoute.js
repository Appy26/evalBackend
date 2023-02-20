const express = require('express');
const userRoute=express.Router()
const {userModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

userRoute.post("/register",async(req,res)=>{
    const{name,email,gender,password,age,city}=req.body
    try {
      const present  =await userModel.findOne({email})
      if(present){
        res.send({"msg":"user already registered please login "})
      }else{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({"msg":"invalid details"})
            }else{
                const new_user=new userModel({name,email,gender,password})
                new_user.save()
                res.send({"msg":"successfully Registered"})
            }
        })
      }
    } catch (error) {
        res.send({"msg":error.message})
    }
})

userRoute.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try {
        const user=await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, async(err, result)=> {
                if( result == true){
                    const token=jwt.sign({userId:user[0]._id},"attach")
                    res.send({"msg":"wrong password please enter correct password"})
                }
            });
        }else{
            res.send({"msg":"Register first with your correct email"})
        }
    } catch (error) {
       res.send ({"msg":error.message})
    }
})

module.exports={userRoute}