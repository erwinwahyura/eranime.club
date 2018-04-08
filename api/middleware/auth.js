const jwt = require('jsonwebtoken');

module.exports = {
  authorization: (req, res, next) => {
    const authorization = req.headers.authorization || req.headers.Authorization
    const bearer = authorization.split(' ')[0]
    const access_token = authorization.split(' ')[1]
    console.log(bearer, access_token);
    if (bearer === 'Bearer') {
      try {
        const decoded = jwt.verify(access_token, process.env.SECRET)
        if (decoded) {
          console.log(decoded);
          next()
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      res.status(401).send({
        ok: false,
        message: 'Invalid Authorization',
        detail: 'basic usage authorization visit example.com'
      })
    }
  },
  authentication: (req, res, next) => {
    const authorization = req.headers.authorization || req.headers.Authorization
    const bearer = authorization.split(' ')[0]
    const access_token = authorization.split(' ')[1]


  },
  authorizationAPI: () => {
    // auth open API
  }
};
