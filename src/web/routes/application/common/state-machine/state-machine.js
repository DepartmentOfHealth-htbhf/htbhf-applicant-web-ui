const { CHECK_URL } = require('../constants')
const { logger } = require('../../../../logger')

const states = {
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW'
}
const actions = {
  GET_NEXT_PAGE: 'getNextPage'
}

const stateMachine = {
  [states.IN_PROGRESS]: {
    getNextPage: (nextPage) => nextPage
  },
  [states.IN_REVIEW]: {
    getNextPage: () => CHECK_URL
  },

  getState: (req) => {
    const state = states.hasOwnProperty(req.session.state) ? states[req.session.state] : states.IN_PROGRESS
    return stateMachine[state]
  },

  setState: (state, req) => {
    logger(req).info(`State set to ${state}`)
    req.session.state = state
  },

  dispatch: (action, req, ...args) => {
    const state = stateMachine.getState(req)

    return state[action](...args)
  }
}

module.exports = {
  states,
  stateMachine,
  actions
}
