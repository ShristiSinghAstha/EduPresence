const Users = require("../Models/UserSchema");
const Teachers = require("./Models/TeacherSchema");
const MarksSchema = require("./Models/MarksSchema");
const Users = require("./Models/UserSchema");
const jwt = require("jsonwebtoken");

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

const getProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.user);
        res.status(200).json(user);
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
    }
module.exports = {login,getProfile,search}