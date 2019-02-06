const { CHECK_URL } = require('../../constants')
const states = {
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW'
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

  dispatch: (req, res, ...args) => {
    const state = stateMachine.getState(req)

    return res.redirect(state.getNextPage(...args))
  }
}

module.exports = {
  states,
  stateMachine
}
