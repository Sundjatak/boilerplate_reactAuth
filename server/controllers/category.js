const Category = require('../models/categoryModel');
const lodash = require('lodash');

exports.addCategory = function(req, res, next) {
    const category = new Category(req.body);
    category.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(category);
        }
    });
};

exports.getCategories = function(req, res, next) {
  Category.find({}, function(err, category) {
    if (err) {
      return next(err);
    }
    if (category) {
      return res.status(422).send({ dataCategory: category });
    }
  });
};

exports.getCategories = function(req, res, next) {
  Category.find({}, function(err, category) {
    if (err) {
      return next(err);
    }
    if (category) {
      return res.status(422).send({ dataCategory: category });
    }
  });
};

exports.setCategory = function(req, res, next) {
  Category.findOne({ _id: req.body.id }, function (err, cat){
    cat.title = req.body.title;
    cat.subtitle = req.body.subtitle;
    cat.save();
  });
};

exports.getCategory = function(req, res, next) {
  Category.findOne({ _id: req.body.id }, function (err, cat){
    if (cat) {
      return res.status(422).send({ dataCategory: cat });
    }
  });

};

exports.removeCategory = function(req, res, next) {
  Category.findOne({ _id: req.body.id }, function (err, cat){
    cat.remove();
  });
};
