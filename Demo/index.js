const express = require('express')
const multer = require('multer')

const app=express()

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cd)=>{
        cd(null,Date.now()+"-"+file.originalname)
    }
})
app.listen(3000,()=>{
    console.log("server running")
})
