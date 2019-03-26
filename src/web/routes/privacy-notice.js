const pageContent = ({ translate }) => ({
  title: translate('privacyNotice.title')
})

const getPrivacyNoticePage = (req, res) => {
  res.render('privacy-notice', {
    ...pageContent({ translate: req.t }),
    previous: req.header('referer')
  })
}

const registerPrivacyNoticeRoute = (app) => {
  app.get('/privacy-notice', getPrivacyNoticePage)
}

module.exports = {
  registerPrivacyNoticeRoute
}
