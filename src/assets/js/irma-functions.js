// be sure that you are loading irmajs functions

function irmaDiscloseOrSign(attributes, header = 'Disclosing attribute with', label = '', message = '') {
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
        ...labelRequest
    } : {
        '@context': 'https://irma.app/ld/request/signature/v2',
        'message': message,
        'disclose': attributes,
        ...labelRequest
    };

    return irmaDoSession(request, header).then(result => {
        console.log("Successful disclosure! 🎉", result)
        return result;
    });
}

function irmaIssueCredential(credential, attributes, header = 'Issuing credential with', disclosePayload = null) {
    console.log('issueCredential');
    const request = {
        '@context': 'https://irma.app/ld/request/issuance/v2',
        'credentials': [{
            'credential': credential,
            'attributes': attributes
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
  //return result.disclosed[index][0].rawvalue || '';
  return irmaDisclosedResultSingleRawValueFromIndex(result, 0);
};
