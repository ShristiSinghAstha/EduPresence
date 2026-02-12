const express = require("express");
const mongoose = require("mongoose");
const User = require("./Schemas/StudentSchema");
const Teachers = require("./Schemas/TeacherSchema");

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/MernStack")
.then(() => {
    console.log("DB Connected");
})
.catch((err) => {
    console.log("DB Connection Error:", err.message);
});

// // app.get('/',(req,res)=>{
// //     res.send('Connected to Express server!')
// // })
// // app.get('/about',(req,res)=>{
// //     res.send('Hellooo!')
// // })

app.post("/api/user", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.post("/api/teachers", async (req, res) => {
    try {
        const teachers = await Teachers.create(req.body);
        res.status(201).json({
            success: true,
            data: teachers
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.get("/api/user/:id", async(req,res)=>{
    try {
        const users= await User.findById(req.params.id);
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
})
app.get("/api/teachers", async(req,res)=>{
    try {
        const teachers= await Teachers.find();
        res.status(200).json(teachers)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.put("/api/user/:id",async(req,res)=>{
    try {
        const updatedUser= await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            // {new:true}
            {returnDocument:'after'})

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete("/api/user/:id", async(req,res)=>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(400).json(error)
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
