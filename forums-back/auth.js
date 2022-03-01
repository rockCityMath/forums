const nJwt = require('njwt');
var config = require('./config');

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

module.exports = jwtAuth;