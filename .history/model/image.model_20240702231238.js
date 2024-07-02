const mongoose= require("mongoose")
const imgSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  
    altTag: {
      type: String,
    },
    metaTag: {
      type: String,
      required: true,
    },
  
  },
  {
    timestamps: true,
  }
);


 const Image = mongoose.model("Image", imgSchema);
 module.exports= Image;
