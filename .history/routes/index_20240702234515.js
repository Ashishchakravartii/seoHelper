var express = require("express");
var router = express.Router();
const upload = require("../middlewares/multer.middlewares.js");
const imgModel = require("../model/image.model.js")
const fs = require("fs")
const path = require("path")

/* GET home page. */
router.get("/", async function (req, res, next) {
 const data=  await imgModel.findOne()
  res.render("index",{data});
});

/* GET admin home page. */
router.get("/admin",async function (req, res, next) {

 const data=  await imgModel.findOne()
  res.render("admin",{data});
});



router.post("/imgDesc/:id", upload.single("image"), async (req, res, next) => {
  const { altTag, metaTag } = req.body;
  let image = null;

  if (req.file) {
    image = req.file.filename; // Multer stores the uploaded file's path

    // Find the existing image in the database
    const existingImg = await imgModel.findById(req.params.id);
    if (existingImg && existingImg.image) {
      // Delete the existing image file from the filesystem
      const existingImagePath = path.join("./public/images", existingImg.image);
      fs.unlink(existingImagePath, (err) => {
        if (err) {
          console.error("Error deleting previous image:", err);
        } else {
          console.log("Previous image deleted successfully");
        }
      });
    }
  }

  // Prepare the update data
  const updateData = {};
  if (image) {
    updateData.image = image;
  }
  if (altTag) {
    updateData.altTag = altTag;
  }
  if (metaTag) {
    updateData.metaTag = metaTag;
  }

  // Update the existing image document with new data
  await imgModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

  res.redirect("/");
});

module.exports = router;
