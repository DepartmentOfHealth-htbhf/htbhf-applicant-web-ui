const express = require('express')
const { handleRequestForPath } = require('../application/middleware')
const { getLanguageBase } = require('../language')
const { getPageMetadata } = require('./get-page-meta-data')
const { PAGES } = require('./pages')

const internationalisation = (translateFn) => ({
  heading: translateFn('guidance.heading'),
  navigationHeading: translateFn('guidance.navigationHeading'),
  previousLabel: translateFn('previous'),
  nextLabel: translateFn('next')
})

const renderGuidanceRoute = (pages, path) => (req, res) =>
  res.render(`guidance/${getLanguageBase(req.language)}/${path}`, {
    pages,
    ...getPageMetadata(pages, path),
    ...internationalisation(req.t)
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
  registerGuidanceRoutes
}
