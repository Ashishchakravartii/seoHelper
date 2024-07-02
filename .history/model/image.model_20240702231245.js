const mongoose= require("mongoose")
const imgSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
  
    altTag: {
      type: String,
    },
    metaTag: {
      type: String,
    },
  
  },
  {
    timestamps: true,
  }
);


 const Image = mongoose.model("Image", imgSchema);
 module.exports= Image;
