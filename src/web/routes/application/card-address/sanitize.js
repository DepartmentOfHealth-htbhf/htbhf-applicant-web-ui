const replaceMultipleSpacesWithOne = (value) => {
  return value.replace(/  +/g, ' ')
}

const sanitize = (req, res, next) => {
  req.body.cardDeliveryAddress = {
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    townOrCity: req.body.townOrCity,
    postcode: replaceMultipleSpacesWithOne(req.body.postcode)
  }
  next()
}

module.exports = {
  sanitize,
  replaceMultipleSpacesWithOne
}
