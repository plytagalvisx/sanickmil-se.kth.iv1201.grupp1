module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.port || 5000,
  URL: process.env.BASE_URL || 'http://localhost:5000',
  MONGODB_URI: process.env.MONGODB_URI || `mongodb://${process.env.DBUSER}:${process.env.DBPW}@ds016138.mlab.com:16138/sanickmil-recruitment`
}