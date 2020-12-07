// be sure that you are loading irmajs functions

function irmaDiscloseOrSign (attributes, label = '', message = '') {
    const labelRequest = !label ? {} : { 'labels': { '0': { 'en': label, 'nl': label } } };
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

    return irmaDoSession(request).then(result => {
        console.log("Successful disclosure! 🎉", result)
        return result;
    });
}

function irmaIssueCredential (credential, attributes) {
    console.log('issueCredential');
    const request = {
        '@context': 'https://irma.app/ld/request/issuance/v2',
        'credentials': [{
            'credential': credential,
            'attributes': attributes
        }]
    };
    return irmaDoSession(request).then(function (result) {
        console.log("Successful issuing credential! 🎉", result)
        return result;
    });
}

function irmaDiscloseOrSignReturningRawValue (attribute, label = '', message = '') {
    return discloseOrSign(attribute, label, message)
        .then(result => {
            return getDiscloseResultRawValue(result);
        })
}

function irmaDiscloseResultRawValue (result) {
    console.log(result);
    return result.disclosed[0][0].rawvalue || '';
}

function irmaDoSession (request) {
    console.log('doSession');

    let options = {
        // Developer options
        debugging: true,

        // Front-end options
        language: 'en',
        translations: {
            header: 'Sign the agreement with <i class="irma-web-logo">IRMA</i>',
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
};
