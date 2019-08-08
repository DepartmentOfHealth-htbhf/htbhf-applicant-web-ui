const stepNotNavigable = (step, req) => step && typeof step.isNavigable === 'function' && !step.isNavigable(req.session)

const isPathInSequence = (path, sequence) => sequence.includes(path)

module.exports = {
  stepNotNavigable,
  isPathInSequence
}
