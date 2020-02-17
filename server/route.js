const AuthentificationController = require('./controllers/authentification');
const CategoryController = require('./controllers/category');
const PostController = require('./controllers/post');
const CaptionController = require('./controllers/caption');
const imgController = require('./controllers/images');
const CommentController = require('./controllers/comment');

require('./services/passport');
const passport = require("passport");

const requireToken = passport.authenticate("jwt", {session: false});

module.exports = function(expressServer){

  expressServer.route('/upload')
  .post(imgController.create)


    expressServer.route('/images')
    .get(imgController.index)

  expressServer.route('/images/:id')
  .delete(imgController.destroy)

  const logController = require('./controllers/log_entries')
  expressServer.route('/log-entries')
  .get(logController.index)

  .get(logController.show)
  .delete(logController.destroy)


  expressServer.get(
    '/specialRessource',
    requireToken,
    function(req, res){
      res.send({ result : "Ceci est du contenu sécurisé" });
    }
  );
  expressServer.post('/upload', function (req, res) {
    Controller.create

  })

  expressServer.post('/signup',
    AuthentificationController.signup
  );
  expressServer.post(
    "/signin",
    AuthentificationController.signin
  );
  expressServer.get(
    '/user',
    requireToken,
    AuthentificationController.getUser
  );
  expressServer.post('/add-comment',
    CommentController.addComment
  );
  expressServer.get('/comments',
    CommentController.getComments
  );
  expressServer.delete('/rm-comment/:id',
    CommentController.removeComment
  );

  expressServer.post('/set-category',
    CategoryController.setCategory
  );
  expressServer.get('/get-category',
    CategoryController.getCategory
  );
  expressServer.post('/add-category',
    CategoryController.addCategory
  );
  expressServer.get('/categories',
    CategoryController.getCategories
  );
  expressServer.post('/set-post/:id',
    PostController.setPost
  );
  expressServer.get('/get-post',
    PostController.getPost
  );
  expressServer.get('/posts',
    PostController.getPosts
  );
  expressServer.post('/add-post',
    PostController.addPost
  );

  expressServer.get('/category/posts',
    PostController.getPostByCategory
  );
  expressServer.delete('/rm-post/:id',
    PostController.removePost
  );
  expressServer.post('/rm-category',
    CategoryController.removeCategory
  );
  expressServer.post('/set-caption',
    CaptionController.setCaption
  );
  expressServer.get('/get-caption',
    CaptionController.getCaption
  );
  expressServer.post('/add-caption',
    CaptionController.addCaption
  );
  expressServer.get('/captions',
    CaptionController.getCaptions
  );
  expressServer.post('/rm-captions',
    CaptionController.removeCaption
  );
}
