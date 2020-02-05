'use strict'

const Image = require('../models/imageModel')
const lodash = require('lodash');


const fs = require('fs')
const path = require('path')
const multer = require('multer')

const DIR = './public/uploads/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
        cb(null, DIR);
    },
  filename: function(req, file, cb){
    cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
 }
})

const upload = multer({ storage, limits:{fileSize: 1000000}, }).single("image");


exports.index = function(req, res){
  Image.find({}, function(err, image){
    if(err) res.send(err)
    res.json(image)
  })
}

exports.show = function(req, res){
  Image.findById({ _id: req.params.id }, function(err, image){
    if(err) res.send(err)
    res.json(image)
  })
}

exports.create = function(req, res, next){
  upload(req, res, function (err) {
      if(!err) {
        register(res.req.file)
          return res.status(200).send({ file : res.req.file }).end();
      }
  });
}

function register( id ) {
  const image = new Image(id);
  image.save(function(err) {
      if (err) {
          return err;
      } else {
          res.json(image);
      }
  });
}

exports.destroy = function(req, res){
  Image.deleteOne({_id: req.params.id}, function(err, image){
    if(err) res.send(err)
    res.json({message: `image (${req.params.id}) was successfully  deleted`})
  })
}
