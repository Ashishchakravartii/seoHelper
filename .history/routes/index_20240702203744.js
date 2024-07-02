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

/* Post admin image, alt tag, meta upload */
router.post("/imgDesc", upload.single("image"), async (req, res, next) => {
  console.log("hereeeeeeeeeeeeeeeeeeeee");
  const { altTag, metaTag } = req.body;
  const image = req.file.filename; // Multer stores the uploaded file's path

  // Find and delete the existing image from the database and filesystem
  const existingImg = await imgModel.findOne();
  if (existingImg) {
    // Delete the image file from the filesystem
    const existingImagePath = path.join(
      "./public/images",
      existingImg.image
    );
    fs.unlink(existingImagePath, (err) => {
      if (err) {
        console.error("Error deleting previous image:", err);
      } else {
        console.log("Previous image deleted successfully");
      }
    });

    // Remove the existing image document from the database
    await imgModel.deleteOne({ _id: existingImg._id });
  }

  // Create a new Post document and save it to your database
  const newImg = new imgModel({
    image,
    altTag,
    metaTag,
  });

  const img = new imgModel(newImg);
  await img.save();

  res.redirect("/");
});

module.exports = router;
