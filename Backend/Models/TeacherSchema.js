const mongoose=require('mongoose');

const TeacherSchema=new mongoose.Schema({
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
        roles:["teacher","admin","HOD","principal"],
        default:"teacher"
    }
},{timestamps:true})

module.exports=mongoose.model('Teacher',TeacherSchema);

