const Caption = require('../models/captionModel');
const lodash = require('lodash');
const multer = require('multer');

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
      console.log(file)
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

exports.addAvatar = function(req, res, next) {
    const caption = new Avatar(req.body);
    caption.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(caption);
        }
    });
};
