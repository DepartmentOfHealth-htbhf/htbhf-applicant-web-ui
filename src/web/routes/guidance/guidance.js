const express = require('express')
const { getLanguageBase } = require('../language')
const { getPageMetadata } = require('./get-page-meta-data')
const { PAGES } = require('./pages')

const internationalisation = (translateFn) => ({
  heading: translateFn('guidance.heading'),
  navigationHeading: translateFn('guidance.navigationHeading'),
  previousLabel: translateFn('previous'),
  nextLabel: translateFn('next')
})

const renderGuidanceRoute = (pages, page) => (req, res) =>
  res.render(`guidance/${getLanguageBase(req.language)}/${page.template}`, {
    pages,
    ...getPageMetadata(pages, page.path),
    ...internationalisation(req.t)
  })

const registerGuidanceRoute = (router) => (page, index, pages) => router.get(page.path, renderGuidanceRoute(pages, page))

const registerGuidanceRoutes = (app) => {
  const guidanceRouter = express.Router()
  PAGES.forEach(registerGuidanceRoute(guidanceRouter))
  app.use(guidanceRouter)
}

module.exports = {
  registerGuidanceRoutes
}
