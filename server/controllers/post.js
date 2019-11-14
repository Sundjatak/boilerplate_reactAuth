const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const lodash = require('lodash');

exports.addPost = function(req, res, next) {
    const post = new Post(req.body);
    post.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(post);
        }
    });
};

exports.getPosts = function(req, res, next) {
  Post.find({}, function(err, post) {
    if (err) {
      return next(err);
    }
    if (post) {
      return res.status(422).send({ dataPost: post });
    }
  });
};

exports.setPost = function(req, res, next) {
  Post.findOne({ _id: req.body.id }, function (err, post){
    post.title = req.body.title;
    post.subtitle = req.body.subtitle;
    post.text = req.body.text;
    post.tags = req.body.tags;
    post.category = req.body.category;
    post.vip = req.body.vip;
    post.save();
  });
};

exports.getPost = function(req, res, next) {
  Post.findOne({ _id: req.body.id }, function (err, post){
    if (post) {
      return res.status(422).send({ dataPost: post });
    }else{
      console.log(err)
    }
  });
};


exports.removePost = function(req, res, next) {
  Post.deleteOne({ _id: req.body.id }, function (err){
   if (err) return handleError(err);
  });
};


exports.getPostByCategory = function(req, res, next) {
  Post.find({category: req.body.id},(err, posts) =>
    {
      return res.status(422).send({ dataPost: posts });
    })
  }
