const routes = require('express').Router();
const {login,getProfile,search} = require('/Controllers/authController');
const verifyToken=require('../Middlewares')

routes.post("/api/login",verifyToken,login);
routes.get("/api/search",verifyToken,search);
routes.get("/api/profile",verifyToken,getProfile);

module.exports=routes;