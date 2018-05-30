const multer = require('multer');
const path = require('path');

function multerMiddleware(req, res, next) {

  let imageName;

  const uploadStorage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, './client/public/uploads');
      },
      filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
  });

  const uploader = multer({storage: uploadStorage});

  const uploadFile = uploader.single('postHeader');

  uploadFile(req, res, function (err) {
      req.imageName = imageName;
      req.uploadError = err;
      next();
  })
}

module.exports = multerMiddleware