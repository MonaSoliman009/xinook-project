const express=require("express");
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const bodyparser=require("body-parser")
const mongoSanitize = require('express-mongo-sanitize');
const helmet=require("helmet")
var xss = require('xss-clean')
var hpp = require('hpp');
const productRoutes=require("./routes/product")
const categoryRoutes=require("./routes/category")
const subCategoryRoutes=require("./routes/subCategory")
const usersRoutes=require("./routes/users")

var app=express()
var PORT=3333
dotenv.config()


app.use(express.json())
app.use(bodyparser.urlencoded({
    extended:false
}))
app.use(bodyparser.json())


app.use("/uploads", express.static("uploads"));

app.use(helmet())
app.use(mongoSanitize());
app.use(xss())
app.use(hpp());




mongoose.connect(`mongodb+srv://mona:${process.env.DB_password}@cluster0.ocshr8g.mongodb.net/?retryWrites=true&w=majority`,()=>{
    console.log("connected successfully");
})
// mongoose.connect(`mongodb://localhost:27017`,()=>{
//     console.log("connected successfully");
// })
app.use("/user",usersRoutes)
app.use("/product",productRoutes)
app.use("/category",categoryRoutes)
app.use("/subCategory",subCategoryRoutes)



app.use("*",(req,res)=>{
res.status(404).json("Not Found")
})

//error handling middleware
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).send('Something broke!')
})



app.listen(PORT,()=>{

    console.log("server listening successfully")
})


//signup  ,  signin  ,  search , pagination  ,  cart (payment) , updateInfo 
