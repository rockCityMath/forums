const nJwt = require('njwt');
var config = require('./config');

//Can be used as route guard
function jwtAuth(req, res, next) {
  if (!req.token) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }

  nJwt.verify(req.token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Could not authenticate token' });
    }
    req.userId = decoded.body.id;
    return res.status(200).send({ auth: true, user: req.userId})
    next();
  });

}

//Returns userID given a token from the header
function idFromToken(token, next) {
  
  var userID = "undefined"

  nJwt.verify(token, config.secret, function(err, decoded)  {
    if(err) {
      return 0
    }
    userID = decoded.body.id
    next(userID)
  })
}

module.exports = {
  jwtAuth,
  idFromToken
}