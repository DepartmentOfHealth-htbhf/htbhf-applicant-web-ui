const { PAGES } = require('./pages')

const isGuidancePageUrl = (path) => PAGES.map((page) => page.path).includes(path)

module.exports = {
  isGuidancePageUrl
}
