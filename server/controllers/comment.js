const Comments = require('../models/commentModel');
const Post = require('../models/postModel');
const lodash = require('lodash');

exports.addComment = function(req, res, next) {
  const comments = new Comments(req.body);
  const postID = req.body.postID;
  return Comments.create(comments).then(docComment => {
    return Post.findByIdAndUpdate(
      postID,
      { $push: { commentIDs: docComment._id } },
      function(err, comment) {
        if (err) {
          return res.status(404)
        }
        return res.send({ dataComment: docComment });
    });
  });
};

exports.getComments = function(req, res, next) {
  Comments.find({}, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (comment) {
      return res.status(200).send({ data: comment });
    }
  })
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
  Comments.deleteOne({ _id: idComment }, function (err, comment){
    if (comment) {
      return res.status(200).send({ isDeleted: true, id: idComment });
    }else{
      return res.status(404).send({ isDeleted: false });
    }
  });
};
