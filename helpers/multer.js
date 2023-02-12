const multer=require("multer")
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      console.log(file);
      cb(null, "./uploads")
    },
    filename: function(req, file, cb) {
      cb(null,  file.originalname);
    }
  });


  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };


  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });


  module.exports=upload;