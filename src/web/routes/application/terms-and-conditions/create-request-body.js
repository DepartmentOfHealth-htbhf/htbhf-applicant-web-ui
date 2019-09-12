const { isUndefined } = require('../../../../common/predicates')

const buildRequestBodyForStep = (session) => (claimant, step) =>
  isUndefined(step.requestBody) ? claimant : { ...claimant, ...step.requestBody(session) }

const createClaim = (steps, session) => steps.reduce(buildRequestBodyForStep(session), {})

const createDeviceFingerprint = (headers) => ({
  'user-agent': headers['user-agent'],
  'ip-address': headers['x-forwarded-for'],
  'accept': headers['accept'],
  'accept-encoding': headers['accept-encoding'],
  'accept-language': headers['accept-language']
})

const createRequestBody = (config, steps, req) => ({
  claimant: createClaim(steps, req.session),
  deviceFingerprint: createDeviceFingerprint(req.headers),
  webUIVersion: config.environment.APP_VERSION
})

module.exports = {
  createRequestBody,
  createClaim
}
