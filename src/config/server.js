const { toBoolean } = require('./to-boolean')

module.exports = {
  PORT: process.env.PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_ID_NAME: 'htbhf.sid',
  CACHE_VIEW_TEMPLATES: toBoolean(process.env.CACHE_VIEW_TEMPLATES)
}
