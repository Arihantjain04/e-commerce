import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/public/temp')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()} - ${file.originalname}`)
    }
  })
  
  const upload = multer({ storage })

  export default upload.single('image');