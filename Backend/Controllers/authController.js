const Users = require("../Models/UserSchema");
const Teachers = require("./Models/TeacherSchema");
const MarksSchema = require("./Models/MarksSchema");
const Users = require("./Models/UserSchema");
const jwt = require("jsonwebtoken");
const Projects=require('../Models/ProjectSchema')
const studentDetails=require('../Models/')

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { user: user._id, email: user.email },
            "Shivani",
            { expiresIn: "24h" }
        );

        res.status(200).json({ user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
const create = async (req,res){
    try {
        const
    } catch (error) {
        
    }
}
const getProfile = async (req, res) => {
    try {
        // const user = await Users.findById(req.user.user);
        res.status(200).json({message:"Login Sucessful"});
    } catch (error) {
        res.status(401).json({ message: "User not found" });
    }
};

const search = async (req, res) => {
    try {
        const {department} = req.query;
        let filter = {}
        if(department){
            filter.department = department;
        }
        const student=await Users.find(filter)
        res.status(200).json(student);
    }
        catch(error){
            res.status(500).json(error);
        }
};

const project = async (req,res)=>{
    try {
        const {studentId, project, status} = req.body
        const projects = await Projects.create({studentId,project,status})
        res.status(201).json(projects)
    } catch (error) {
        res.status(400).json(error)
    }
}

const studentDetails = async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        const marks = await MarksSchema.findOne({ studentId: student._id}).select("-studentId").select;
        const project = await Projects.findOne({studentId:student._id})

        res.status(200).json({ student, marks,project});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const teacherDetails = async (req, res) => {
    try {
        const teacher = await User.findById(req.params.id);
        const project = await Projects.findOne({teacherId:student._id})
        res.status(200).json({ teacher, marks,project});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


const approve = async() => {
    try {
        const project = await Projects.findById(req.params.id)
        if(!project){
            return res.status(404).json({message: "Project not found"})
        }
        // if(project.status !== "pending"){
        //     return res.status(200).json({message:`Projectc${project.status}`})
        // }
        project.status = "approved"
        await project.save()
        res.status(200).json({message:`Project ${project.status}`,project})
    } catch (error) {
        
    }
}

const rejected = async() => {
    try {
        const project = await Projects.findById(req.params.id)
        if(!project){
            return res.status(404).json({message: "Project not found"})
        }
        // if(project.status !== "pending"){
        //     return res.status(200).json({message:`Projectc${project.status}`})
        // }
        project.status = "rejected"
        await project.save()
        res.status(201).json({message:`Project ${project.status}`})
    } catch (error) {
        
    }
}


module.exports = {login,getProfile,search,project,studentDetails,approve,rejected}
