const { compose, equals, prop } = require('ramda')

const hasMatchingPath = (path) => compose(equals(path), prop('path'))

const getPreviousPage = (pages, index) => pages[index - 1]

const getNextPage = (pages, index) => pages[index + 1]

const getPageMetadata = (pages, path) => {
  const pageIndexForPath = pages.findIndex(hasMatchingPath(path))

  return {
    activePath: path,
    previousPage: getPreviousPage(pages, pageIndexForPath),
    nextPage: getNextPage(pages, pageIndexForPath)
  }
}

module.exports = {
  getNextPage,
  getPreviousPage,
  getPageMetadata
}
