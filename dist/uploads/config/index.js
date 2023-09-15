// functions/src/uploads/config/index.js
var multer = require("multer");
module.exports = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./functions/src/uploads/upload");
    },
    filename: function(req, file, callback) {
      const image = file.originalname;
      const randomPrefix = require("crypto").randomBytes(16).toString("hex");
      callback(null, `${randomPrefix}_${image}`);
    },
    filelimits: {
      file: 1
    },
    fileFilter: function(req, file, callback) {
      if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
        return true;
      } else {
        return false;
      }
    }
  })
});
