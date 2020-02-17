const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const Comments = require('../models/commentModel');
const lodash = require('lodash');

exports.addPost = function(req, res, next) {
    const post = new Post(req.body);
    console.log(req.body)
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
      return res.status(200).send({ dataPost: post });
    }
  }).populate("commentIDs", "-__v");
};


// exports.getComments = Post.find().populate('Comments').exec(function(err, posts) {
//     if (err) throw err;
//     let commentIDs = [];
//     posts.forEach(function(post) {
//       console.log("post" + post)
//         post.commentIDs.forEach(function(comments) {
//           console.log(comments)
//             commentIDs.push(comments.commentIDs);
//         });
//     });
//     console.log(commentIDs)
//     // response.send(comments); // adTimes should contain all addTimes from his friends
// });

exports.setPost = function(req, res, next) {
  Post.findOne({ _id: req.params.id }, function (err, post){
    post.title = req.body.title;
    post.subtitle = req.body.subtitle;
    post.text = req.body.text;
    post.tags = req.body.tags;
    post.category = req.body.category;
    post.vip = req.body.vip;
    post.image = req.body.image;
    post.save();
    return res.json(post);
  });
};

exports.getPost = function(req, res, next) {
  Post.findOne({ _id: req.body.id }, function (err, post){
    if (post) {
      return res.status(200).send({ dataPost: post });
    }else{
      return res.status(404)
    }
  });
};

exports.removePost = function(req, res, next) {
  const idPost = req.params.id
  Post.deleteOne({ _id: idPost }, function (err, post){
    if (post) {
      console.log(post)
      return res.status(200).send({ isDeleted: true, id: idPost });
    }else{
      console.log(err)
      return res.status(404).send({ isDeleted: false });
    }
  });
};

exports.getPostByCategory = function(req, res, next) {
  Post.find({category: req.body.id},(err, posts) =>
    {
      return res.status(422).send({ dataPost: posts });
  })
};
