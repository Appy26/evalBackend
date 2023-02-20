const express = require('express');
const jwt = require('jsonwebtoken');
const authenticate=(req,res,next)=>{
    const token =req.headers.authorization
    try {
        jwt.verify(token, 'register', function(err, decoded) {
            console.log(decoded) 
            req.body.user=decoded.user
            if(decoded){
                next()
            }else{
                res.send({"msg":"Please Login"})
            }
          });
    } catch (error) {
        res.send({"msg":"wrong authentication token please verify it"})
    }
}
module.exports={authenticate}