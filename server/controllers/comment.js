const Comments = require('../models/commentModel');
const lodash = require('lodash');

exports.addComment = function(req, res, next) {
    const comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) {
            return next(err);
        } else {
          return res.status(200).send({ dataComment: comment });

        }
    });
};

exports.getComments = function(req, res, next) {
  Comments.find({ postID: req.body.postID }, function(err, comment) {
    if (comment) {
      console.log(comment)
      return res.status(200).send({ dataComment: comment });
    }else {
      return res.status(404)
    }
  });
};

exports.getComment = function(req, res, next) {
  Comments.findOne({ _id: req.body.id }, function (err, comment){
    if (comment) {
      return res.status(200).send({ dataComment: comment });
    }else{
      return res.status(404)
    }
  });
};

exports.removeComment = function(req, res, next) {
  const idComment = req.params.id
  console.log(idComment)
  Comment.deleteOne({ _id: idComment }, function (err, comment){
    if (comment) {
      console.log(comment)
      return res.status(200).send({ isDeleted: true, id: idComment });
    }else{
      console.log(err)
      return res.status(404).send({ isDeleted: false });
    }
  });
};
