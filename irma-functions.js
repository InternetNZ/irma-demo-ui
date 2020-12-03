// be sure that you are loading irmajs functions

(function () {
  const discloseOrSign = function (attribute, label = '', message = '') {
    const labelRequest = !label ? {} : {'labels': {'0': {'en': label, 'nl': label}}};
    const request = !message ? {
      '@context': 'https://irma.app/ld/request/disclosure/v2',
      'disclose': [
        [
          [attribute]
        ]
      ],
      ...labelRequest
    } : {
      '@context': 'https://irma.app/ld/request/signature/v2',
      'message': message,
      'disclose': [
        [
          [attribute]
        ]
      ],
      ...labelRequest
    };
    return doSession(request).then(function (result) {
      showSuccess('Success, attribute value: <strong>' + result.disclosed[0][0].rawvalue + '</strong>');
      return getDiscloseResultRawValue(result);
    });
  };

  const doSession = function (request) {
    console.log('doSession');
    clearOutput();
    showSuccess('Demo running...');

    const server = IRMA_SERVER;
    const authmethod = AUTH_METHOD_TOKEN;
    const key = PRIVATE_TOKEN;
    const requestorname = '';

    console.log(request);

    return irma.startSession(server, request, authmethod, key, requestorname)
      .then(function (pkg) {
        return irma.handleSession(pkg.sessionPtr, {server: server, token: pkg.token, method: 'popup', language: 'en'});
      })
      .then(function (result) {
        console.log('Done', result);
        return result;
      })
      .catch(function (err) {
        showError(err);
      });
  };

  const discloseOrSignReturningRawValue = function (attribute, label = '', message = '') {
    return discloseOrSign(attribute, label, message)
      .then(result => {
        return getDiscloseResultRawValue(result);
      })
  };

  const getDiscloseResultRawValue = function (result) {
    console.log(result);
    return result.disclosed[0][0].rawvalue || '';
  };

  return {
    discloseOrSign: discloseOrSign,
    discloseOrSignReturningRawValue: discloseOrSignReturningRawValue
  }
})()
