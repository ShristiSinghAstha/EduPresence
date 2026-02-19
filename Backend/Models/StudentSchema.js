const mongoose=require('mongoose');

const StudentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type:String,
        enum:["Student","Teacher"],
        default:"Student"
    },
    department:{
        type: String,
        required: true
    }
},{timestamps:true})

module.exports=mongoose.model('Student',StudentSchema);
