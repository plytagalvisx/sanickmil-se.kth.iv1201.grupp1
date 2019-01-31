module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.port || 3000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  SECRET: process.env.SECRET || process.env.SECRET,
  MONGODB_URI: process.env.MONGODB_URI || `mongodb://${process.env.DBUSER}:${process.env.DBPW}@ds016138.mlab.com:16138/sanickmil-recruitment`
}