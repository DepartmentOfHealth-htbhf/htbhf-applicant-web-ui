const { compose, equals, prop } = require('ramda')

const getPageForPath = (pages, path) => pages.find(hasMatchingPath(path))

const hasMatchingPath = (path) => compose(equals(path), prop('path'))

const getPreviousPage = (pages, index) => pages[index - 1]

const getNextPage = (pages, index) => pages[index + 1]

const getPageMetadata = (pages, path) => {
  const pageIndexForPath = pages.findIndex(hasMatchingPath(path))
  const page = getPageForPath(pages, path)

  return {
    activePath: path,
    previous: getPreviousPage(pages, pageIndexForPath),
    next: getNextPage(pages, pageIndexForPath),
    title: page.title
  }
}

module.exports = {
  getPageForPath,
  getNextPage,
  getPreviousPage,
  getPageMetadata
}
