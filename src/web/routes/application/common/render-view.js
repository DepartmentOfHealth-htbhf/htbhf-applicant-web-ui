const renderView = (template, getPageContent, redirect) => (req, res) => {
  if (req.method === 'POST' && !res.locals.errors) {
    return res.redirect(redirect)
  }

  res.render(template, {
    ...getPageContent({ translate: req.t }),
    csrfToken: req.csrfToken(),
    htmlLang: req.language,
    errorSummaryText: req.t('validation:errorSummaryText')
  })
}

module.exports = {
  renderView
}
