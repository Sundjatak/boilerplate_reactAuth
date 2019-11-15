const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressServer = express();
const router = require('./route');
const http = require('http');
const mongoose = require('mongoose');
const multer = require("multer");
const cors = require("cors");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const path = require("path");

mongoose.connect(
  'mongodb+srv://Leo:elephant@cluster0-vjn4m.mongodb.net/test?retryWrites=true&w=majority',
  { useUnifiedTopology: true },
   { useNewUrlParser: true }
);
mongoose.connection
  .once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo)
    gfs.collection('uploads')})
  .on('error', error => console.log('Erreur de connexion ;', error));



expressServer.use(morgan('combined'));
expressServer.use(express.static(path.join(__dirname, '..', 'public')));
expressServer.use(bodyParser.json());
expressServer.use(cors());
const port = 3090;
const server = http.createServer(expressServer);
router(expressServer);
server.listen(3090);
console.log('Le server écoute sur le port', port);
