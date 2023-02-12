const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmail = require("../helpers/sendEmail")
async function createUser(req, res, next) {
    var user = req.body
    try {
        var user = await userModel.create(user)
        res.status(201).json(user)
    } catch (err) {
        res.status(402).json({ error: err.message })
    }
}

async function updateUser(req, res) {
    var id = req.params.id
    var data = req.body;
    try {
        var updatedUser = await userModel.findByIdAndUpdate(id, { $set: data }
            , { new: true, runValidators: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

async function login(req, res) {
    var user = req.body;
    try {
        var result = await userModel.findOne({ emailAddress: user.emailAddress });
        if (result) {
            var valid = bcrypt.compareSync(user.password, result.password);
            if (valid) {
                var token = jwt.sign({
                    data:
                    {
                        userEmail: result.email,
                        userId: result._id,
                        role: result.role

                    }
                },
                    process.env.secret_password, { expiresIn: "1h" });
                res.status(200).json(token);
            }
            else { res.status(401).json("please insert vaild Data"); }
        }
        else {
            res.status(401).json("Email or Password is invalid Try again");
        }
    }
    catch (err) { res.status(422).json(err.message); }
}

async function forgetPassword(req, res) {
    var email = req.body.emailAddress
    try {
        const user = await userModel.findOne({ emailAddress: email })
        if (!user) {
            res.status(400).json("user with given email does not exist");
        }

        var token = jwt.sign({
            data:
            {
                userEmail: user.email,
                userId: user._id,
                role: user.role

            }
        },
            process.env.secret_password, { expiresIn: "1h" });

        var link = `http://localhost:3333/user/${user._id}/${token}`
        try {
            await sendEmail(user.emailAddress, "Passord Reset", link)
        } catch (err) {
            res.json({ error: err.message });
        }



    } catch (err) {
        res.json({ error: err.message });

    }


}


async function resetPassword(req, res) {
    var userId = req.params.id
try{

    var user = await userModel.findOne({ _id: userId })
    if (!user) {
        res.status(400).json("invalid link or expired")
    }

   await userModel.updateOne({ _id: userId }, 
        { $set: { password: req.body.password } }, { new: true })

        res.json("password updated successfully")
}catch(err){
    res.json({err:err.message});
}


}



function test(){

    
}
module.exports = {
    createUser,
    updateUser,
    login,
    forgetPassword,
    resetPassword
}