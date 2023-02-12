const express = require('express')
const { createUser,updateUser,login,forgetPassword,resetPassword} = require('../controllers/users')
var router = express.Router()
const {isUser}=require("../middlewares/auth")

//create account
router.post("/",createUser)

//update user
router.patch("/:id",updateUser)
router.post("/login",login)
router.post("/forget-password",forgetPassword)
router.post("/:id/:token",isUser,resetPassword)
// router.patch("/changePassord",isUser,changePassord)

//delete user     /:id    authorization

//get all users    authorization   get

//get by id       authentication

//update password      /:id   authentication

////////////////////////////////

//product

//crud
//search for product
//pagination
//get by id



//cart



//forget password   


module.exports=router