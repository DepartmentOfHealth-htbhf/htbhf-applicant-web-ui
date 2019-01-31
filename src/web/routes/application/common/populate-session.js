/**
 * Returns an object containing all properties from the request body, excluding any starting with '_' (e.g. '_csrf').
 * @param req
 */
const defaultTransform = (req) => {
  const persistentAttributes = {}
  for (const k in req.body) {
    if (!k.startsWith('_')) {
      persistentAttributes[k] = req.body[k]
    }
  }
  return persistentAttributes
}

/**
 * Places the attributes that we want to save from this request in a 'persistentAttributes' session object.
 * 'persistentAttributes' will be replaced on every page submission.
 * It is the responsibility of a later function (handle-post.js) to take the values from persistentAttributes and
 * add them to the claim object (after any errors have been dealt with).
 * @param operation a function that returns the values to be stored in the session.
 *                  Defaults to copying all fields from the body.
 * @returns {function(*=, *, *): *}
 */
const populateSession = (operation) => (req, res, next) => {
  if (typeof operation === 'undefined') {
    req.session.persistentAttributes = defaultTransform(req)
  } else {
    req.session.persistentAttributes = operation(req)
  }

  return next()
}

module.exports = {
  populateSession
}
