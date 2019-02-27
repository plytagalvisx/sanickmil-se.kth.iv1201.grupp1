const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const dbservice = require('../integration/database-services')

/**
 * Array of path/method combos that may be accessed without logging in.
 */
const unauthorizedAccessPaths = [
  // Registring a user
  {route: '/api/user', method: 'POST'},
  // Trying to authenticate
  {route: '/api/auth', method: 'GET'},
  // Loggin out
  {route: '/api/auth', method: 'DELETE'}
];

/**
 * Looks to see if the requested path/method combo is permitted
 * without loggin in. Add path/method combos to the permittedAccess
 * array to add more
 * @param {String} path The requested path.
 * @param {String} method The request method.
 * @returns {Boolean} Whether or not the access is permitted.
 */
function loggedOutAccess(route, method) {
  /*
  * Fancy way of "filtering" out a sought for object by its properties,
  * and if such a object exists, it will not be 'undefined'
  * and the function returns true
  */
  return unauthorizedAccessPaths.find(ele => (ele.route === route && ele.method === method)) !== undefined;
}

/**
 * Authenticates a request by its token.
 * @param {String} token The token proving the user is logged in.
 * @returns {Object} A object containing a {Boolean} success field
 * indicating whether the token was authenticated or not. Also has
 * a message field with more information.
 */
async function authenticateToken(token) {
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
}

/**
 * This middleware handles Authentication and Autorization
 * of api endpoint access through the token info (user info)
 */
router.all(/.*/, async (req, res, next) => {
  const route = req.baseUrl;
  const method = req.method;
  if (req.baseUrl === '/dev/dbtransfer' && process.env.NODE_ENV !== 'production') {
    next();
  }
  /*if (req.headers.authorization) {
    console.log('USER SENT AUTHORIZATION HEADER TOKEN', req.headers.authorization);
  }*/
  if (loggedOutAccess(route, method)) {
    return next();
  }

  // Is the user logged in?
  // let token = req.cookies.jwtToken;
  // if (token.startsWith('Bearer ')) {
    //   token = token.replace('Bearer ', '');
    // }
  let token = req.headers.authorization;
  if (!token)
    return res.status(400).json({message: 'No token supplied'});
  if (!token.startsWith('Bearer'))
    return res.status(400).json({message: 'Invalid Token'});
  token = token.replace('Bearer ', '');

  const authAudit = await authenticateToken(token);
  if (!authAudit.success)
    return res.status(401).json({message: authAudit.message});

  const {role, user} = await decodeUsernameAndRole(token);
  try {
    req.userSSN = await dbservice.getSSNByUsername(user);
  } catch (err) {
    return res.status(500).json({message: 'You might not exist...'});
  }
  if (role === 'recruit' && allowedRecruiterAction(route, method)) {
    return next();
  } else if (allowedSelfAction(route, method)) {
    return next();
  }
  res.status(401).json({message: 'You are not authorized to do this.'})
});

// Specified which actions the Recruiters may take
// As "ADMINS".
const RECRUITER_ACTIONS = [
  // Getting all applications
  {route: /^\/api\/application\/all$/, method: 'GET'},
  // Approving/Denying applications
  {route: /^\/api\/application\/+\d+(-\d+)*$/, method: 'PATCH'},
  // Get a specific users application
  {route: /^\/api\/application\/+\d+(-\d+)*$/, method: 'GET'}
]

function allowedRecruiterAction(route, method) {
  route = route.trim();
  const allowed = RECRUITER_ACTIONS.find((action) => {
    return route.match(action.route) && method === action.method;
  }) !== undefined;
  return allowed;
}

// Specifies which actions may be taken only 
const SELF_ACTIONS = [
  {route: /^\/api\/application$/, method: 'POST'},
  // Means '/api/application/12331-12312 (ending in only numbers and dashes)
  {route: /^\/api\/application$/, method: 'DELETE'},
  {route: /^\/api\/application$/, method: 'PATCH'},
  {route: /^\/api\/skills$/, method: 'GET'},
  {route: /^\/api\/application$/, method: 'GET'},
  {route: /^\/api\/user$/, method: 'GET'}
]

function allowedSelfAction(route, method) {
  // Unsure wether this need to be trimmed. but better to be safe than sorry
  route = route.trim();
  const allowed = SELF_ACTIONS.find((action) => {
    return route.match(action.route) && method === action.method;
  }) !== undefined;
  return allowed;
}

async function decodeUsernameAndRole(token) {
  try {
    const {role, user} = await jwt.verify(token, config.SECRET);
    return {role, user};
  } catch (err) {
    console.log('Error in getUserType', err);
    throw err;
  }
}

module.exports = router;