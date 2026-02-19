// const express = require("express");
// const mongoose = require("mongoose");
// const User = require("./Schemas/StudentSchema");
// const Teachers = require("./Schemas/TeacherSchema");
// const MarksSchema = require("./Schemas/MarksSchema");
// const Users = require("./Schemas/UserSchema");
// const jwt = require("jsonwebtoken");

// const app = express();
// app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// mongoose.connect("mongodb://127.0.0.1:27017/MernStack")
// .then(() => {
//     console.log("DB Connected");
// })
// .catch((err) => {
//     console.log("DB Connection Error:", err.message);
// });

// // // app.get('/',(req,res)=>{
// // //     res.send('Connected to Express server!')
// // // })
// // // app.get('/about',(req,res)=>{
// // //     res.send('Hellooo!')
// // // })

// app.post("/api/user", async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         res.status(201).json({
//             success: true,
//             data: user
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// });

// app.post("/api/teachers", async (req, res) => {
//     try {
//         const teachers = await Teachers.create(req.body);
//         res.status(201).json({
//             success: true,
//             data: teachers
//         });

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// });

// app.get("/api/user/:id", async(req,res)=>{
//     try {
//         const users= await User.findById(req.params.id);
//         res.status(200).json(users)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })
// app.get("/api/teachers", async(req,res)=>{
//     try {
//         const teachers= await Teachers.find();
//         res.status(200).json(teachers)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

// app.put("/api/user/:id",async(req,res)=>{
//     try {
//         const updatedUser= await User.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             // {new:true}
//             {returnDocument:'after'})

//         res.status(200).json(updatedUser)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

// app.delete("/api/user/:id", async(req,res)=>{
//     try {
//         const deleteUser = await User.findByIdAndDelete(req.params.id);
//         res.status(200).json(deleteUser)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })
// app.post("/api/students", async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         res.status(201).json({
//             success: true,
//             data: user
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// });
// app.post("/api/marks",async(req,res)=>{
//     try {
//         const {studentId,maths,science}=req.body
//         const marks = await MarksSchema.create({studentId,maths,science})
//         res.status(201).json({
//             success:true,
//             data:marks
//         })
//     } catch (error) {       
//         res.status(400).json({
//             success:false,
//             message:error.message
//         })
//     }
// })

// app.get("/api/students/:id", async (req, res) => {
//     try {
//         const student = await User.findById(req.params.id);
//         const marks = await MarksSchema.findOne({ studentId: student._id });
//         res.status(200).json({ student, marks });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// });
// // const verifyToken = (req, res, next) => {
// //     const token = req.query.token;
// //     if (!token) {
// //         return res.status(401).json({ message: "Invalid or Unauthorized" });
// //     }
// //     if (token === '12345') {
// //         return next();
// //     }
// //     return res.status(401).json({ message: "Invalid or Unauthorized" });
// // };

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     const token = authHeader.split(" ")[1];
//     try {
//         const payload = jwt.verify(token, "Asthaa");
//         req.user = payload;
//         return next();
//     } catch (error) {
//         return res.status(401).json({ message: "Invalid or expired token" });
//     }
// };
// app.post("/api/login",async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await Users.findOne({ email, password });
//         if (!user) {
//             return res.status(401).json({ message: "Invalid Credentials" });
//         }
//         if (user.role !== "ADMIN") {
//             return res.status(403).json({user, message: `Welcome: ${user.role}` });
//         }
//         const token=jwt.sign({user:user._id,email:user.email},"Asthaa",{expiresIn:"24h"})
//         res.status(200).json({user,token});
//     } catch (error) {
//         res.status(400).json(error);
//         console.log(error);
//     }
// });
// app.get("/api/profile",verifyToken,async(req,res)=>{
//     try {
//         const user = await Users.findById(req.user.user);
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(401).json(error)
//         console.log(error);
//     }
// })
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server Running on Port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const User = require("./Models/StudentSchema");
const Teachers = require("./Models/ProjectSchema");
const MarksSchema = require("./Models/MarksSchema");
const Users = require("./Models/UserSchema");
const jwt = require("jsonwebtoken");
const route = require('../Routes/authRoute')

const app = express();
app.use(express.json());
app.use(route);

mongoose.connect("mongodb://127.0.0.1:27017/MernStack")
.then(() => {
    console.log("DB Connected");
})
.catch((err) => {
    console.log("DB Connection Error:", err.message);
});


// USER ROUTES

app.post("/api/user", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.get("/api/user/:id", async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.put("/api/user/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.delete("/api/user/:id", async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteUser);
    } catch (error) {
        res.status(400).json(error);
    }
});


//TEACHER ROUTES 

app.post("/api/teachers", async (req, res) => {
    try {
        const teachers = await Teachers.create(req.body);
        res.status(201).json({ success: true, data: teachers });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.get("/api/teachers", async (req, res) => {
    try {
        const teachers = await Teachers.find();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(400).json(error);
    }
});


//STUDENTS & MARKS 

app.post("/api/students", async (req, res) => {
    try {
        const student = await User.create(req.body);
        res.status(201).json({ success: true, data: student });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post("/api/marks", async (req, res) => {
    try {
        const { studentId, maths, science } = req.body;

        const marks = await MarksSchema.create({
            studentId,
            maths,
            science
        });

        res.status(201).json({ success: true, data: marks });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});




// PROFILE (PROTECTED) 

app.get("/api/profile", verifyToken, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    }
});


// SERVER 

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});

