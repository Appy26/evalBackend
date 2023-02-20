const express =require("express")
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {connection}=require("./config/db")
const{userRoute}=require("./Routes/userRoute")
const{postRoute}=require("./Routes/postRoute")
const {authenticate}=require("./middlewares/authorize")
const cors = require('cors');
require("dotenv").config()

const app=express()
app.use(cors())
app.use(express.json())
app.use("/user",userRoute)
app.use(authenticate)
app.use("/post",postRoute)

app.listen(process.env.port, async()=>{
    try {
     await connection 
     console.log("connected to db") 

    } catch (error) {
       console.log(error); 
    }
    console.log("server is running ")
})