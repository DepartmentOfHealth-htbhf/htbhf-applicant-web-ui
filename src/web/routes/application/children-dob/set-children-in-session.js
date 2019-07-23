const { pickBy } = require('ramda')
const { countKeysContainingString } = require('./count-keys')
const { DAY_FIELD_SUFFIX } = require('./constants')
const { isChildEntry } = require('./predicates')

const setChildrenInSessionForGet = (req) => {
  if (!req.session.hasOwnProperty('children')) {
    req.session.children = {
      inputCount: 1,
      childCount: 0
    }
  }

  return req
}

const setChildrenInSessionForPost = (req, res, next) => {
  const childCount = countKeysContainingString(DAY_FIELD_SUFFIX, req.body)

  req.session.children = {
    ...pickBy(isChildEntry, req.body),
    inputCount: childCount,
    childCount: childCount
  }

  // GET behaviour is not called on validation error so locals also need setting for POST
  res.locals.children = req.session.children
  req.session.children.autofocus = false
  return next()
}

module.exports = {
  setChildrenInSessionForGet,
  setChildrenInSessionForPost
}
