const AuthentificationController = require('./controllers/authentification');
const CategoryController = require('./controllers/category');
const PostController = require('./controllers/post');
const CaptionController = require('./controllers/caption');

require('./services/passport');
const passport = require("passport");

const requireToken = passport.authenticate("jwt", {session: false});

module.exports = function(expressServer){
  const fs = require('fs')
  const path = require('path')
  const multer = require('multer')

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const uploadsDir = path.join(__dirname, '..', 'public', 'uploads', `avatar`)
      fs.mkdirSync(uploadsDir)
      cb(null, uploadsDir)
    },
    filename: function(req, file, cb){
      cb(null, file.originalname)
    }
  })

  const upload = multer({ storage })
  const imgController = require('./controllers/images')
  expressServer.route('/log-entries/:log_entry_id/images')
  .get(imgController.index)
  .post(upload.single("file"), imgController.create)
  expressServer.route('log-entries/:log_entry_id/images/:id')
  .get(imgController.show)
  .delete(imgController.destroy)


  const logController = require('./controllers/log_entries')
  expressServer.route('/log-entries')
  .get(logController.index)
  .post(upload.single("data"), logController.create)
  expressServer.route('log-entry')
  .get(logController.show)
  .delete(logController.destroy)

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
  expressServer.get(
    '/user',
    requireToken,
    AuthentificationController.getUser
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
  expressServer.post('/rm-post',
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
