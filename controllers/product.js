var productModel = require("../models/product")
const uplouds = require("../helpers/cloundinary")
const  fs=require("fs")
async function createProduct(req, res, next) {
    console.log(req.body);
    req.body.mainImages = []
    try {
    var uploader = async (path) => {
        var res= await uplouds(path, "images")
        console.log(res);
        return res
    }} catch (err) {
        console.log(err.message)
    }

    for (var i = 0; i < req.files.length; i++) {
        const url = await uploader(req.files[i].path)
        req.body.mainImages.push(url)
    }
    try {
        var product = await productModel.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }


}

function pagination(req,res,next){
    const page= req.query.page || 1;
    req.page=page;
    req.limit=20;
    req.skip=0
    if(page>1){
        req.skip=(page-1)*req.limit
    }
    next()

}

async function getAllProducts(req,res,next){
 const products=  await productModel.find({}).limit(req.limit).skip(req.skip)
res.status(200).json(products)

}

async function getProductBycategory(req,res){
     const catId=   req.params.id
  const products= await  productModel.find({category:catId}).populate("category").populate("subCategory")
   res.status(200).json(products)

}

function sortProducts(){
    console.log("sortProducts")
    console.log("sort products")
}
module.exports = { createProduct,pagination,getAllProducts,getProductBycategory }