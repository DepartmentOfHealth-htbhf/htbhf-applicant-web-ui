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
      'jsonBody': {
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

const createPostcodeLookupWithResultsMapping = (postcode) => {
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
      'jsonBody': {
        'header': {
          'uri': `https://api.ordnancesurvey.co.uk/places/v1/addresses/postcode?postcode=${postcode}`,
          'query': `postcode=${postcode}`,
          'offset': 0,
          'totalresults': 43,
          'format': 'JSON',
          'dataset': 'DPA',
          'lr': 'EN,CY',
          'maxresults': 100,
          'epoch': '69',
          'output_srs': 'EPSG:27700'
        },
        'results': [
          {
            'DPA': {
              'UPRN': '83001911',
              'UDPRN': '10668218',
              'ADDRESS': `1, BIRKS, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'BUILDING_NUMBER': '1',
              'THOROUGHFARE_NAME': 'BIRKS',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '2',
              'X_COORDINATE': 405859,
              'Y_COORDINATE': 414551.33,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'RD02',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Detached',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': '2',
              'BLPU_STATE_CODE_DESCRIPTION': 'In use',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000029684227',
              'PARENT_UPRN': '83235707',
              'LAST_UPDATE_DATE': '23/09/2018',
              'ENTRY_DATE': '08/10/2002',
              'BLPU_STATE_DATE': '23/09/2010',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          },
          {
            'DPA': {
              'UPRN': '83001912',
              'UDPRN': '10668223',
              'ADDRESS': `2, BIRKS, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'BUILDING_NUMBER': '2',
              'THOROUGHFARE_NAME': 'BIRKS',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '1',
              'X_COORDINATE': 405877.83,
              'Y_COORDINATE': 414582.04,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'RD02',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Detached',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': null,
              'BLPU_STATE_CODE_DESCRIPTION': 'Unknown/Not applicable',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000029684225',
              'PARENT_UPRN': '83235707',
              'LAST_UPDATE_DATE': '10/02/2016',
              'ENTRY_DATE': '08/10/2002',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          },
          {
            'DPA': {
              'UPRN': '83002107',
              'UDPRN': '10668224',
              'ADDRESS': `2, COCKLEY COTE, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'BUILDING_NUMBER': '2',
              'THOROUGHFARE_NAME': 'COCKLEY COTE',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '2',
              'X_COORDINATE': 406088,
              'Y_COORDINATE': 414841,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'RD04',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Terraced',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': '2',
              'BLPU_STATE_CODE_DESCRIPTION': 'In use',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000029703448',
              'PARENT_UPRN': '83235495',
              'LAST_UPDATE_DATE': '23/09/2018',
              'ENTRY_DATE': '08/10/2002',
              'BLPU_STATE_DATE': '11/08/2010',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          },
          {
            'DPA': {
              'UPRN': '83002108',
              'UDPRN': '10668226',
              'ADDRESS': `3, COCKLEY COTE, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'BUILDING_NUMBER': '3',
              'THOROUGHFARE_NAME': 'COCKLEY COTE',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '1',
              'X_COORDINATE': 406094,
              'Y_COORDINATE': 414848,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'RD04',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Terraced',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': '2',
              'BLPU_STATE_CODE_DESCRIPTION': 'In use',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000029703447',
              'PARENT_UPRN': '83235495',
              'LAST_UPDATE_DATE': '10/02/2016',
              'ENTRY_DATE': '08/10/2002',
              'BLPU_STATE_DATE': '11/08/2010',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          },
          {
            'DPA': {
              'UPRN': '83221668',
              'UDPRN': '10668197',
              'ADDRESS': `GOAT HILL FARM, 2, GOAT HILL, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'ORGANISATION_NAME': 'GOAT HILL FARM',
              'BUILDING_NUMBER': '2',
              'THOROUGHFARE_NAME': 'GOAT HILL',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '2',
              'X_COORDINATE': 405439,
              'Y_COORDINATE': 414802,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'CA01',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Farm / Non-Residential Associated Building',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': '2',
              'BLPU_STATE_CODE_DESCRIPTION': 'In use',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000029684238',
              'LAST_UPDATE_DATE': '23/09/2018',
              'ENTRY_DATE': '23/10/2007',
              'BLPU_STATE_DATE': '23/10/2007',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          },
          {
            'DPA': {
              'UPRN': '83002148',
              'UDPRN': '10668219',
              'ADDRESS': `1, LAUNDS, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'BUILDING_NUMBER': '1',
              'THOROUGHFARE_NAME': 'LAUNDS',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '2',
              'X_COORDINATE': 406565,
              'Y_COORDINATE': 415268,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'RD03',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Semi-Detached',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': '2',
              'BLPU_STATE_CODE_DESCRIPTION': 'In use',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000029703513',
              'LAST_UPDATE_DATE': '28/11/2018',
              'ENTRY_DATE': '08/10/2002',
              'BLPU_STATE_DATE': '27/11/2018',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          },
          {
            'DPA': {
              'UPRN': '83002149',
              'UDPRN': '10668225',
              'ADDRESS': `2, LAUNDS, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'BUILDING_NUMBER': '2',
              'THOROUGHFARE_NAME': 'LAUNDS',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '1',
              'X_COORDINATE': 406556.79,
              'Y_COORDINATE': 415257.46,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'RD03',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Semi-Detached',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': '2',
              'BLPU_STATE_CODE_DESCRIPTION': 'In use',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000029703515',
              'LAST_UPDATE_DATE': '21/03/2016',
              'ENTRY_DATE': '08/10/2002',
              'BLPU_STATE_DATE': '17/04/2014',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          },
          {
            'DPA': {
              'UPRN': '83185427',
              'UDPRN': '50645330',
              'ADDRESS': `PHILIP SUNLEY TRANSPORT LTD, LOWER LAUND FARM, LOWER LAUNDS, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'ORGANISATION_NAME': 'PHILIP SUNLEY TRANSPORT LTD',
              'BUILDING_NAME': 'LOWER LAUND FARM',
              'THOROUGHFARE_NAME': 'LOWER LAUNDS',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '1',
              'X_COORDINATE': 406369.66,
              'Y_COORDINATE': 415141.25,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'RD02',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Detached',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': '2',
              'BLPU_STATE_CODE_DESCRIPTION': 'In use',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000000093085793',
              'LAST_UPDATE_DATE': '10/02/2016',
              'ENTRY_DATE': '28/01/2004',
              'BLPU_STATE_DATE': '17/05/2011',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          },
          {
            'DPA': {
              'UPRN': '83185424',
              'UDPRN': '10668211',
              'ADDRESS': `OWLERS CLOUGH, LOWER LAUNDS, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'BUILDING_NAME': 'OWLERS CLOUGH',
              'THOROUGHFARE_NAME': 'LOWER LAUNDS',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '1',
              'X_COORDINATE': 406226.47,
              'Y_COORDINATE': 415272.35,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'RD02',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Detached',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': '2',
              'BLPU_STATE_CODE_DESCRIPTION': 'In use',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000029703511',
              'LAST_UPDATE_DATE': '10/02/2016',
              'ENTRY_DATE': '28/01/2004',
              'BLPU_STATE_DATE': '09/06/2008',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          },
          {
            'DPA': {
              'UPRN': '83185428',
              'UDPRN': '10668217',
              'ADDRESS': `1, LOWER WORTSHILL, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'BUILDING_NUMBER': '1',
              'THOROUGHFARE_NAME': 'LOWER WORTSHILL',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '1',
              'X_COORDINATE': 405821.29,
              'Y_COORDINATE': 415059.91,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'RD03',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Semi-Detached',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': '2',
              'BLPU_STATE_CODE_DESCRIPTION': 'In use',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000029684269',
              'LAST_UPDATE_DATE': '10/02/2016',
              'ENTRY_DATE': '28/01/2004',
              'BLPU_STATE_DATE': '09/02/2009',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          },
          {
            'DPA': {
              'UPRN': '83185422',
              'UDPRN': '10668227',
              'ADDRESS': `3, LOWER WORTSHILL, SLAITHWAITE, HUDDERSFIELD, ${postcode}`,
              'BUILDING_NUMBER': '3',
              'THOROUGHFARE_NAME': 'LOWER WORTSHILL',
              'DEPENDENT_LOCALITY': 'SLAITHWAITE',
              'POST_TOWN': 'HUDDERSFIELD',
              'POSTCODE': postcode,
              'RPC': '1',
              'X_COORDINATE': 406083,
              'Y_COORDINATE': 415435,
              'STATUS': 'APPROVED',
              'LOGICAL_STATUS_CODE': '1',
              'CLASSIFICATION_CODE': 'RD',
              'CLASSIFICATION_CODE_DESCRIPTION': 'Dwelling',
              'LOCAL_CUSTODIAN_CODE': 4715,
              'LOCAL_CUSTODIAN_CODE_DESCRIPTION': 'KIRKLEES',
              'POSTAL_ADDRESS_CODE': 'D',
              'POSTAL_ADDRESS_CODE_DESCRIPTION': 'A record which is linked to PAF',
              'BLPU_STATE_CODE': null,
              'BLPU_STATE_CODE_DESCRIPTION': 'Unknown/Not applicable',
              'TOPOGRAPHY_LAYER_TOID': 'osgb1000029703534',
              'PARENT_UPRN': '83197385',
              'LAST_UPDATE_DATE': '10/02/2016',
              'ENTRY_DATE': '28/01/2004',
              'LANGUAGE': 'EN',
              'MATCH': 1,
              'MATCH_DESCRIPTION': 'EXACT'
            }
          }
        ]
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
  createPostcodeLookupWithNoResultsMapping,
  createPostcodeLookupWithResultsMapping
}
