
module.exports = {
    uploadImage: async (file) => {
        const cloudinary = require('cloudinary').v2
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_APIKEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        const path = file.path
        var filename = Date.now()
        var details = await cloudinary.uploader.upload(
            path,
            { public_id: `tscShoes/${filename}`, tags: `tscShoes` }, // directory and tags are optional
            function(err, image) {
              if (err) return res.send(err)
              console.log('file uploaded to Cloudinary')
              // remove file from server
              const fs = require('fs')
              fs.unlinkSync(path)
              // return image details
              url = image.url
              return url
            }
          )
          return details
    }
}