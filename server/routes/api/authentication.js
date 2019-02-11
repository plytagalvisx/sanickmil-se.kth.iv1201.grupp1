const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 * Array of path/method combos that may be accessed without logging in.
 */
const permittedAccess = [
  {route: '/api/user', method: 'POST'},
  {route: '/api/auth', method: 'GET'}
];

/**
 * Looks to see if the requested path/method combo is permitted
 * without loggin in. Add path/method combos to the permittedAccess
 * array to add more
 * @param {String} path The requested path.
 * @param {String} method The request method.
 * @returns {Boolean} Whether or not the access is permitted.
 */
function loggedOutAccess(path, method) {
  /*
  * Fancy way of "filtering" out a sought for object by its properties,
  * and if such a object exists, it will not be 'undefined'
  * and the function returns true
  */
  return permittedAccess.find(ele => (ele.route === path && ele.method === method)) !== undefined;
}

/**
 * Authenticates a request by its token.
 * @param {String} token The token proving the user is logged in.
 * @returns {Object} A object containing a {Boolean} success field
 * indicating whether the token was authenticated or not. Also has
 * a message field with more information.
 */
async function authenticateToken(token) {
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }
    return await jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return {
          success: false,
          message: 'Token is not valid'
        };
      } else {
        return {
          success: true,
          message: 'Token is valid',
        };
      }
    });
  } else {
    return {
      success: false,
      message: 'You must log in to see access this.'
    };
  }
}

/**
 * This is called every request to see if the requested path is permitted
 * If the user is not authenticated, the response will be 401 - Unauthorized.
 * Otherwise the middleware will pass the baton the the actual handler.
 */
router.all(/.*/, async (req, res, next) => {
  // If the user is trying to register, or loggin in, authentication is obviously not required.
  if (loggedOutAccess(req.baseUrl, req.method)) {
    next();
  } else {
    const token = req.cookies.jwtToken;
    const authAudit = await authenticateToken(token);
    if (!authAudit.success) {
      res.status(401)
      .json({message: authAudit.message});
    } else {
      next();
    }
  }
});

module.exports = router;