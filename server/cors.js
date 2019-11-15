'use-strict'

module.exports = function(expressServer){
  const cors = require('cors')
  const corsOptions = {
    origin: function(origin, callback){
      if(process.env.CORS_WHITELIST.split('').indexOf(origin) !== -1) {
        callback(null, true)
      }else {
        callback(new Error('Not allowed by CORS config'))
      }
    },
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  }
  const publicOptions = {
    origin: function(origin, callback) {
      callback(null, true)
    },
    methods: "GET"
  }
  expressServer.option('*', cors(corsOptions))
  expressServer.use(cors(corsOptions))
  expressServer.use('/public', cors(publicOptions))
}
