const Caption = require('../models/captionModel');
const lodash = require('lodash');

exports.addCaption = function(req, res, next) {
    const caption = new Caption(req.body);
    caption.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(caption);
        }
    });
};
exports.getCaptions = function(req, res, next) {
  Caption.find({}, function(err, caption) {
    if (err) {
      return next(err);
    }
    if (caption) {
      return res.status(422).send({ dataCaption: caption });
    }
  });
};
exports.setCaption = function(req, res, next) {
  Caption.findOne({ id: req.body.id }, function (err, caption){
    caption.title = req.body.title;
    caption.subtitle = req.body.subtitle;
    caption.text = req.body.text;
    caption.type = req.body.type;
    caption.save();
  });
};
exports.getCaption = function(req, res, next) {
  Caption.findOne({ _id: req.body.id }, function (err, cap){
    if (cap) {
      return res.status(422).send({ dataCaption: cap });
    }
  });
};

exports.removeCaption = function(req, res, next) {
  Caption.findOne({ _id: req.body.id }, function (err, post){
    post.remove();
  });
};
