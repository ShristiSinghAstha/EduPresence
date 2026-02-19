const mongoose = require ('mongoose')

const projectSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"  //"Student"
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    project:{
        type:String,
        required: true
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        required: true
    }
})

module.exports=mongoose.model("Projects", projectSchema)
