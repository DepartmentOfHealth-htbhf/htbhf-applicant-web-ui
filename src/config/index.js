require('dotenv').config()
// TO DO: validate config schema with joi https://www.npmjs.com/package/joi
module.exports = {
  environment: require('./environment'),
  server: require('./server'),
  redis: require('./redis'),
  features: require('./features')
}
