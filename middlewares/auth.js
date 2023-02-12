const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.headers.authorization
    if(req.params.token){
        const token =req.params.token
    }
    jwt.verify(token, process.env.secret_password, function (err, decoded) {
        if (decoded) {
            req.userData = decoded.data;
            next()
        }

        if (err) {
            console.log(err);
            res.status(401).json("you must be authenticated")
        }

    })
}

function isAdmin(req, res, next) {
    auth(req,res,function (){
        if(req.userData.role=="admin"){
            next()
        }else{
            res.status(401).json("not authorized")
        }
    })

}

function isUser(req, res, next) {
    auth(req,res,function (){
        if(req.userData.role=="user"){
            next()
        }else{
            res.status(401).json("not authorized")
        }
    })

}

function isSubAdmin(req, res, next) {
    auth(req,res,function (){
        if(req.userData.role=="subAdmin"){
            next()
        }else{
            res.status(401).json("not authorized")
        }
    })

}

module.exports={isAdmin,isUser,isSubAdmin}