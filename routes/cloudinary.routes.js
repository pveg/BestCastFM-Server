const fileUploader = require("../config/cloudinary.config")
const router = require("express").Router();

router.post('/upload', fileUploader.single('profileImage'), (req, res, next) => {
    if(!req.file){
      next(new Error ('No file uploaded!'));
      return;
    }
    res.json({fileUrl: req.file.path})
  })

  module.exports = router;