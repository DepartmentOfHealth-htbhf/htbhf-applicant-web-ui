const setNextAllowedPath = (req, path) => {
  req.session.nextAllowedStep = path
}

module.exports = {
  setNextAllowedPath
}
