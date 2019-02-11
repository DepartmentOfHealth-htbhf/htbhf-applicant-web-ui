const { pick, path } = require('ramda')
const { CLAIM_PATH, CLAIM_KEYS } = require('./constants')

const setKey = (req) => (key, value) => {
  req.session.claim[key] = value
}

const setKeys = (validKeys, req) => (keys) => {
  req.session.claim = {
    ...req.session.claim,
    ...pick(validKeys, keys)
  }
}

const getKey = (req) => (key) => path([...CLAIM_PATH, key], req)

const get = (req) => () => path(CLAIM_PATH, req)

const createClaimService = (req) => ({
  setKey: setKey(req),
  setKeys: setKeys(CLAIM_KEYS, req),
  getKey: getKey(req),
  get: get(req)
})

module.exports = {
  setKey,
  setKeys,
  getKey,
  get,
  createClaimService
}
