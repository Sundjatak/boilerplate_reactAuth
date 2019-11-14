const AuthentificationController = require('./controllers/authentification');
const CategoryController = require('./controllers/category');
const PostController = require('./controllers/post');
const CaptionController = require('./controllers/caption');

require('./services/passport');
const passport = require("passport");

const requireToken = passport.authenticate("jwt", {session: false});

module.exports = function(expressServer){

  expressServer.get(
    '/specialRessource',
    requireToken,
    function(req, res){
      res.send({ result : "Ceci est du contenu sécurisé" });
    }
  );

  expressServer.post('/signup',
    AuthentificationController.signup
  );
  expressServer.post(
    "/signin",
    AuthentificationController.signin
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
  expressServer.post('/set-post',
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
}
