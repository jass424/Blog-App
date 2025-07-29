const multer = require('multer');
const path = require('path');


// for upload blog thumbnail
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(__dirname, '../upload/images'));
    },
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage:storage});


// for upload profile image
const avatarStorage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(__dirname, '../upload/profileImage'));
    },
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const avatarUpload = multer({ storage:avatarStorage});

module.exports = {upload, avatarUpload}