'use strict'

const Image = require('../models/imageModel')
const lodash = require('lodash');

exports.index = function(req, res){
  Image.find({log_entry_id: req.params.log_entry_id}, function(err, image){
    if(err) res.send(err)
    res.json(image)
  })
}

exports.show = function(req, res){
  Image.findById(id, function(err, image){
    if(err) res.send(err)
    res.json(image)
  })
}

exports.create = function(req, res){
  const path = require('path')
  const remove = path.join(__dirname, '..', 'public')
  const relPath = req.file.path.replace(remove, '')
  const newImage = new Image(req.body)

  newImage.logEntryId = req.params.log_entry_id
  newImage.name = relPath
  newImage.save(function(err, image){
    if(err) res.send(err)
    res.json(image)
    console.log("image imported");
  });
}

exports.destroy = function(req, res){
  Image.deleteOne({_id: req.params.id}, function(err, image){
    if(err) res.send(err)
    res.json({message: `image (${req.params.id}) was successfully  deleted`})
  })
}
