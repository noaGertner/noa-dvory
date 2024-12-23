const express=require('express');
const {getAllusers,login,register}=require("../controllers/user.controllers");
const { auth } = require('../middlewarws/auth');
const userRouter=express.Router(); 

userRouter.get('/',auth,getAllusers)
userRouter.post('/login',login)
userRouter.get('/register',register)
module.exports=userRouter;