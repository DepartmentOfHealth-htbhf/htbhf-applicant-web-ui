const stepNotNavigable = (step, req) => step && typeof step.isNavigable === 'function' && !step.isNavigable(req.session)

const isPathInApplicationFlow = (path, sequence) => sequence.includes(path)

module.exports = {
  stepNotNavigable,
  isPathInApplicationFlow
}
