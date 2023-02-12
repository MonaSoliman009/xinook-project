const {createProduct,pagination,getAllProducts,getProductBycategory}=require("../controllers/product")
const express=require("express");
const router=express.Router();
const upload=require("../helpers/multer")
const {isAdmin}=require("../middlewares/auth")

router.post("/",upload.array('img',2),createProduct)
router.get("/",pagination,getAllProducts)
router.get("/:id",getProductBycategory)
module.exports = router