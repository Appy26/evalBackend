const express = require('express');
const mongoose = require('mongoose');
const postRoute=express.Router()
const {postModel}=require("../models/post.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

postRoute.post("/create",async (req,res)=>{
    const payload=req.body
    try {
        const newpost=new postModel(payload)
        newpost.save()
        res.send({"msg":"successfully added"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

postRoute.get("/",async (req,res)=>{
    const query=req.query
    try {
        const posts=await postModel.find(query)
res.send(posts)
    } catch (error) {
        res.send({"msg":error.message})  
    }
})

postRoute.get("/top",async (req,res)=>{
   try {
    const posts=await postModel.find().sort({no_of_comment})
    res.send(posts[0])
    } catch (error) {
        res.send({"msg":error.message})  
   }
})

postRoute.patch("/update/:id",async (req,res)=>{
const Id=req.params.id
const payload=req.body
try {
    await postModel.findByIdAndUpdate({_id:Id},payload)
    res.send({"msg":"successfully updated"})  
} catch (error) {
    res.send({"msg":error.message})   
}
})

postRoute.delete("/delete/:id",async (req,res)=>{
    const Id=req.params.id
    try {
        await postModel.findByIdAndDelete({_id:Id})
        res.send({"msg":"successfully deleted"})  
    } catch (error) {
        res.send({"msg":error.message})   
    }
    })

    module.exports={postRoute}