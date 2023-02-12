const express = require("express");
const {
  createSubcategory,
  updateSubcategory,
  getAllSubcategory,
  getSubcategoryByID,
  deleteSubcategory,
} = require("../controllers/subCategory");
const router = express.Router();
// Create Category
router.post("/", createSubcategory);
// Update Category
router.patch("/:id", updateSubcategory);
// Get All Category
router.get("/",  getAllSubcategory);
// Get Category by ID
router.get("/:id",  getSubcategoryByID);
// Delete Category
router.delete("/:id", deleteSubcategory);
module.exports = router;
