const mongoose = require ('mongoose')

const marksSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"  //"Student"
    },
    maths:{
        type:Number,
        required: true
    },
    science:{
        type:Number,
        required: true
    }
})

module.exports=mongoose.model("Marks", marksSchema)