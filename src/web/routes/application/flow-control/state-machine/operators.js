const setNextAllowedPath = (req, journey, path) => {
  req.session.nextAllowedStep = path
}

module.exports = {
  setNextAllowedPath
}
