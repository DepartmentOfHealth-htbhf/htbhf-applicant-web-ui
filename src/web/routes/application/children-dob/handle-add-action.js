const { PATH } = require('./constants')

const addActionRequested = body => body.hasOwnProperty('add')

const handleAddAction = (req, res, next) => {
  if (!addActionRequested(req.body)) {
    return next()
  }

  req.session.children.inputCount = req.session.children.childCount + 1
  return res.redirect(PATH)
}

module.exports = {
  handleAddAction
}
