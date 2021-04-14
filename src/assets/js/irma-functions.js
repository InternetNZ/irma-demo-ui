// be sure that you are loading irmajs functions

function irmaDiscloseOrSign(attributes, header = 'Disclosing attribute with', label = '', message = '', revocation = []) {
    const labelRequest = !label ? {} : {
        'labels': {
            '0': {
                'en': label,
                'nl': label
            }
        }
    };
    const request = !message ? {
        '@context': 'https://irma.app/ld/request/disclosure/v2',
        'disclose': attributes,
        'revocation': revocation,
        ...labelRequest
    } : {
        '@context': 'https://irma.app/ld/request/signature/v2',
        'message': message,
        'disclose': attributes,
        'revocation': revocation,
        ...labelRequest
    };

    return irmaDoSession(request, header).then(result => {
        console.log("Successful disclosure! 🎉", result)
        return result;
    });
}

function irmaIssueCredential(credential, attributes, header = 'Issuing credential with', disclosePayload = null, revocationKey = None) {
  console.log('issueCredential');
  let validity = {};
  if (attributes.validity) {
    validity = {validity: attributes.validity};
    delete attributes.validity;
  }
  const request = {
    '@context': 'https://irma.app/ld/request/issuance/v2',
    'credentials': [{
      credential: credential,
      attributes: attributes,
      revocationKey: revocationKey,
      ...validity,
    }],
    'disclose': disclosePayload,
  };
  return irmaDoSession(request, header).then(function (result) {
    console.log("Successful issuing credential! 🎉", result)
    return result;
  });
}

function irmaDoSession(request, header = '') {
    console.log('doSession');

    let options = {
        // Developer options
        debugging: true,

        // Front-end options
        language: 'en',
        translations: {
            header: `${header} <i class="irma-web-logo">IRMA</i>`,
            loading: 'Just one second please!'
        },

        // Back-end options
        session: {
            // Point this to your IRMA server:
            url: IRMA_SERVER,

            // Define your disclosure request:
            start: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': PRIVATE_TOKEN,
                },
                body: JSON.stringify(request)
            }
        }
    };

    console.log(options);

    let irmaPopup = irma.newPopup(options);

    return irmaPopup.start()
}

const irmaDisclosedResultSingleRawValueFromIndex = function (result, index) {
  return result.disclosed[index][0].rawvalue || '';
};

const irmaDisclosedResultSingleRawValue = function (result) {
  return irmaDisclosedResultSingleRawValueFromIndex(result, 0);
};

const DiscloseQueryGenerator = function () {
  this.elements = [];

  const andAttribute = function (attribute) {
    this.elements.push([
      [attribute]
    ]);

    return this;
  }

  const toApi = function () {
    return this.elements;
  }

  const forAttribute = function (attribute) {
    this.elements = [];
    return this.andAttribute(attribute);
  }

  return {
    forAttribute: forAttribute,
    andAttribute: andAttribute,
    toApi: toApi,
  };
}
