let express = require('express'),
    router = express.Router(),
    cloudinary = require('cloudinary').v2;
    
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
})

router.route('/upload').post((req, res, next) => {
  cloudinary.uploader.upload(req.body.blob, (err, image) => {
    if (err) console.log(err);
    console.log(image.public_id);
    res.send(image.url);
  });
})

module.exports = router;