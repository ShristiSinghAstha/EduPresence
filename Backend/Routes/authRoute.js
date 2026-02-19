const routes = require('express').Router();
const {login,getProfile,search,project,studentDetails} = require('/Controllers/authController');
const verifyToken=require('../Middlewares')

routes.post("/api/login",login);
routes.get("/api/search",verifyToken,search);
routes.get("/api/profile",verifyToken,getProfile);
routes.get("/api/projects",project)
routes.get("/api/students/:id",studentDetails)
routes.get("/api/teacher/:id",teacherDetails)
routes.patch("/api/project/:id/approve",approve);
routes.patch("/api/project/:id/reject",reject);


module.exports=routes;
// login create profile name search projects