const { handleRequestForPath } = require('./middleware')
const { UNSUCCESSFUL_APPLICATION } = require('./common/constants')

const pageContent = ({ translate }) => ({
  title: translate('UnsuccessfulApplication.title'),
  subTitle: translate('UnsuccessfulApplication.subTitle')
})

const getUnsuccessfulApplicationPage = (req, res) => {
  res.render('UnsuccessfulApplication', {
    ...pageContent({ translate: req.t })
  })
}

const registerUnsuccessfulApplicationRoute = (config, steps, app) => {
  app.get(UNSUCCESSFUL_APPLICATION, handleRequestForPath(config, steps), getUnsuccessfulApplicationPage)
}

module.exports = {
  registerUnsuccessfulApplicationRoute
}
