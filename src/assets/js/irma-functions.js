// be sure that you are loading irmajs functions

function irmaDiscloseOrSign(attributes, header = 'Disclosing attribute with', label = '', message = '',
revocation = null) {
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
    console.log("Successful disclosure!", result)
    return result;
  });
}

function irmaIssueCredential(credential, attributes, header = 'Issuing credential with', disclosePayload = null) {
  console.log('issueCredential');
  let validity = {};
  if (attributes.validity) {
    validity = {
      validity: attributes.validity
    };
    delete attributes.validity;
  }
  let revocationKey = {};
  if (attributes.revocationKey) {
    revocationKey = {
      revocationKey: attributes.revocationKey
    };
    delete attributes.revocationKey;
  }
  const request = {
    '@context': 'https://irma.app/ld/request/issuance/v2',
    'credentials': [{
      credential: credential,
      attributes: attributes,
      ...validity,
      ...revocationKey,
    }],
    'disclose': disclosePayload,
  };
  return irmaDoSession(request, header).then(function (result) {
    console.log("Successful issuing credential!", result)
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

  let irmaPopup = irma.newPopup(options);

  return irmaPopup.start()
}

const irmaDisclosedResultSingleRawValueFromIndex = function (result, credentialIndex = 0, attributeIndex = 0) {
  return result.disclosed[credentialIndex][attributeIndex].rawvalue || '';
};

const irmaDisclosedResultSingleRawValue = function (result) {
  return irmaDisclosedResultSingleRawValueFromIndex(result, credentialIndex = 0);
};

const DiscloseQueryGenerator = function () {
  this.elements = [];

  const _init = function () {
    this.elements = [];
    return this;
  }

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

  const orAttributes = function (...attributes) {
    const or = [];
    attributes.forEach(attribute => {
      if (Array.isArray(attribute)) {
        or.push(attribute);
      } else {
        or.push([attribute]);
      }
    });
    this.elements.push(or);
    return this;
  }

  return {
    _init: _init,
    andAttribute: andAttribute,
    forAttribute: forAttribute,
    orAttributes: orAttributes,
    toApi: toApi,
  };
}
