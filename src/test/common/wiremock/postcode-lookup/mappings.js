const createPostcodeLookupWithNoResultsMapping = (postcode) => {
  return JSON.stringify({
    'request': {
      'method': 'GET',
      'urlPath': '/places/v1/addresses/postcode',
      'queryParameters': {
        'postcode': {
          'equalTo': postcode
        },
        'key': {
          'matches': '.*'
        }
      }
    },
    'response': {
      'status': 200,
      'body': {
        'header': {
          'uri': `https://api.ordnancesurvey.co.uk/places/v1/addresses/postcode?postcode=${postcode}`,
          'query': `postcode=${postcode}`,
          'offset': 0,
          'totalresults': 0,
          'format': 'JSON',
          'dataset': 'DPA',
          'lr': 'EN,CY',
          'maxresults': 100,
          'epoch': '69',
          'output_srs': 'EPSG:27700'
        }
      },
      'headers': {
        'Date': 'Fri, 23 Aug 2019 11:04:02 GMT',
        'Content-Type': 'application/json;charset=UTF-8',
        'Connection': 'keep-alive',
        'tx_id': '1566558242864:864',
        'status': 'success'
      }
    }
  })
}

module.exports = {
  createPostcodeLookupWithNoResultsMapping
}
