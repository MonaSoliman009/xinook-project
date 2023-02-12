const express = require("express");
const {
  createCategory,
  updateCategory,
  getAllCategory,
  getCategoryByID,
  deleteCategory,
} = require("../controllers/category");
const router = express.Router();
// Create Category
router.post("/", createCategory);
// Update Category
router.patch("/:id", updateCategory);
// Get All Category
router.get("/", getAllCategory);
// Get Category by ID
router.get("/:id", getCategoryByID);
// Delete Category
router.delete("/:id", deleteCategory);
module.exports = router;