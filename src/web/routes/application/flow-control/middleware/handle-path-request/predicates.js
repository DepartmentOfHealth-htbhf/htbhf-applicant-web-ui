const stepNotNavigable = (step, req) => step && typeof step.isNavigable === 'function' && !step.isNavigable(req.session)

module.exports = {
  stepNotNavigable
}
