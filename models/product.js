const mongoose = require('mongoose');
const joi = require('joi');

const productSchema=mongoose.Schema({
   title:joi.string().required().min(3).max(50).trim(),
   description:joi.string().required().trim(),
   colors: joi.array().items(joi.string()).required(),
   mainImages:joi.array().required(),
   otherImages: joi.array(),
   price:joi.number().required(),
   priceAfterDiscount:joi.number(),
   quantity:joi.number().required(),
   rate:joi.number().required().default(0),
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true
   },
   subCategory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubCategory",
    required:true
   }



})

module.exports=mongoose.model("Product",productSchema)