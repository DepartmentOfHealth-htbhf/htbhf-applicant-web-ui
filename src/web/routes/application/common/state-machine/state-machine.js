const { equals } = require('ramda')
const { CHECK_URL, CONFIRM_URL } = require('../constants')
const { logger } = require('../../../../logger')

const states = {
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  COMPLETED: 'COMPLETED'
}
const actions = {
  GET_NEXT_PATH: 'getNextPath',
  IS_PATH_ALLOWED: 'isPathAllowed',
  GET_NEXT_ALLOWED_PATH: 'getNextAllowedPath'
}

const getStepByPath = (steps, path) => steps.find(step => step.path === path)

const getNextPath = (steps, path) => {
  const step = getStepByPath(steps, path)
  const nextPath = step.next

  if (!nextPath) {
    throw new Error(`No next step defined for ${path}`)
  }

  return nextPath
}

const isPathAllowed = (sequence, allowed, path) =>
  sequence.findIndex(equals(path)) <= sequence.findIndex(equals(allowed))

const stateMachine = {
  [states.IN_PROGRESS]: {
    getNextPath: (req, steps) => getNextPath(steps, req.path),
    isPathAllowed: (req, sequence) => isPathAllowed(sequence, req.session.nextAllowedStep, req.path),
    getNextAllowedPath: (req) => req.session.nextAllowedStep
  },
  [states.IN_REVIEW]: {
    getNextPath: () => CHECK_URL,
    isPathAllowed: (req, sequence) => isPathAllowed(sequence, req.session.nextAllowedStep, req.path),
    getNextAllowedPath: (req) => req.session.nextAllowedStep
  },
  [states.COMPLETED]: {
    getNextPath: () => CONFIRM_URL,
    isPathAllowed: (req) => req.path === CONFIRM_URL,
    getNextAllowedPath: () => CONFIRM_URL
  },

  getState: (req) => {
    return states.hasOwnProperty(req.session.state) ? states[req.session.state] : states.IN_PROGRESS
  },

  setState: (state, req) => {
    logger.info(`State set to ${state}`, { req })
    req.session.state = state
  },

  dispatch: (actionType, req, ...args) => {
    const state = stateMachine.getState(req)
    const action = stateMachine[state][actionType]

    if (typeof action !== 'undefined') {
      return action(req, ...args)
    }

    return null
  }
}

module.exports = {
  states,
  stateMachine,
  actions,
  isPathAllowed
}
