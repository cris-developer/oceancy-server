
require('dotenv').config();

const { v2: cloudinary } = require("cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
console.log ('process.env.CLOUDINARY_KEY:',process.env.CLOUDINARY_KEY)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "react-images",
    allowed_formats: ["jpg", "png"],
  },
});

module.exports = multer({ storage });
