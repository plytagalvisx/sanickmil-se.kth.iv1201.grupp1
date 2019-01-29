module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.port || 3000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://<dbuser>:<dbpassword>@ds016138.mlab.com:16138/sanickmil-recruitment'
}