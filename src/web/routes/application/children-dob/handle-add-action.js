const { PATH, ADD_CHILD_KEY } = require('./constants')

const addActionRequested = body => body.hasOwnProperty(ADD_CHILD_KEY)

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
