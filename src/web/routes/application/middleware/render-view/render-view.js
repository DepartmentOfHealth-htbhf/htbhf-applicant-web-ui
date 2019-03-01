const renderView = (step) => (req, res) => {
  res.render(step.template, {
    ...step.pageContent({ translate: req.t }),
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  renderView
}
