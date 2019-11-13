const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressServer = express();
const router = require('./route');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect(
  'mongodb+srv://Leo:elephant@cluster0-vjn4m.mongodb.net/test?retryWrites=true&w=majority',
  { useUnifiedTopology: true },
   { useNewUrlParser: true }
);
mongoose.connection
  .once('open', ()=> console.log('Connecté à Mongo'))
  .on('error', error => console.log('Erreur de connexion ;', error));

expressServer.use(morgan('combined'));
expressServer.use(bodyParser.json({type: '*/*'}));
expressServer.use(cors());

const port = 3090;
const server = http.createServer(expressServer);
router(expressServer);
server.listen(3090);
console.log('Le server écoute sur le port', port);
