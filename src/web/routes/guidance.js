const express = require('express')
const { compose, equals, prop } = require('ramda')
const { handleRequestForPath } = require('./application/middleware')
const { getLanguageBase } = require('./language')

const PAGES = [
  {
    title: 'How it works',
    path: '/how-it-works'
  },
  {
    title: 'Eligibility',
    path: '/eligibility'
  },
  {
    title: 'What you get',
    path: '/what-you-get'
  },
  {
    title: 'What you can buy',
    path: '/what-you-can-buy'
  },
  {
    title: 'Using your card',
    path: '/using-your-card'
  },
  {
    title: 'Apply for Healthy Start',
    path: '/apply-for-healthy-start'
  },
  {
    title: 'Report a change',
    path: '/report-a-change'
  }
]

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

const getPageForPath = (pages, path) => pages.find(hasMatchingPath(path))

const renderGuidanceRoute = (pages, path) => (req, res) =>
  res.render(`guidance/${getLanguageBase(req.language)}/${path}`, {
    pages,
    ...getPageMetadata(pages, path)
  })

const registerGuidanceRoute = (router) => (page, index, pages) => router.get(page.path, renderGuidanceRoute(pages, page.path))

/**
 * handleRequestForPath() checks the state machine before rendering the page to see if the session
 * needs to be cleared.
 */
const registerGuidanceRoutes = (config, steps, app) => {
  const guidanceRouter = express.Router()
  guidanceRouter.use(handleRequestForPath(config, steps))
  PAGES.forEach(registerGuidanceRoute(guidanceRouter))
  app.use(guidanceRouter)
}

module.exports = {
  registerGuidanceRoutes,
  getPageForPath,
  getNextPage,
  getPreviousPage,
  getPageMetadata
}
