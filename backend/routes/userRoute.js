const express = require('express');
const { userSignup, userLogin, userLogout, authentication, userData } = require('../controllers/userController');
const userRouter = express.Router()

// * USER *

// CREATE USER
userRouter.post("/signup", userSignup) 

// LOGIN USER
userRouter.post("/login",userLogin)

// LOGOUT USER
userRouter.post("/logout",authentication,userLogout)

// GET USER DATA
userRouter.get("/:id",userData)

module.exports = userRouter