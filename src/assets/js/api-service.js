// ignoring IIFE to test purposes - this should be really globals

const AWS_IRMA_BACKEND_SERVER = 'https://f9emnttxd6.execute-api.ap-southeast-2.amazonaws.com/demo';

const SECOND_PRIVATE_TOKEN = 'slU2raoR4f6q1eiVQbYuk5GGI3j2qaL25BdB6SSA';

const checkPassport = (base64Image, nameArray) => {
  familyName = nameArray.pop();
  return {
           "givenNames": nameArray.join(' ');,
           "familyName": familyName,
           "gender": "F",
           "documentNumber": "PA1234567",
           "nationality": "NZL",
           "issuerCountry": "NZL",
           "birthDate": "1990-04-18",
           "dateOfExpiry": "2025-04-18",
           "governmentVerified": "verified",
           "verificationReference": "3d7f9ed3-8bf7-41e8-868b-7cc679a0397f"
         });
}

const checkDriverLicence = (base64Image, nameArray) => {
  familyName = nameArray.pop();
  return {
           "givenNames": nameArray.join(' ');,
           "familyName": familyName,
           "documentNumber": "DT1234565",
           "birthDate": "1984-04-06",
           "dateOfExpiry": "",
           "governmentVerified": {
               "driverLicence": True,
               "familyName": True,
               "givenName": True,
               "birthDate": True
           },
           "verificationReference": "a5f433c58-f516-4352-845f-055534f6698c",
           "documentVersion": "980"
         });
}

const handleErrorMessage = (message) => {
  if (message.message) {
    message = message.message;
  } else if (message.description) {
    message = message.description;
  }

  if (message === 'Aborted') {
    message = 'Session was aborted';
  } else {
    if (typeof message === 'object') {
      message = message.toString();
    }
    message = `Error: ${message}`;
  }

  return message;
}

const verifySignature = function (signature) {
  const url = `${AWS_IRMA_BACKEND_SERVER}/irma/signature/verify`;
  return _doFetchPost(url, signature);
}

const _apiSingleSourcePost = (endpoint, body) => {
  const url = `${AWS_IRMA_BACKEND_SERVER}/single-source/${endpoint}`;
  return _doFetchPost(url, body);
};

const _doFetchPost = (url, body) => {
  const options = {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': SECOND_PRIVATE_TOKEN,
    },
    mode: 'cors',
  };
  return fetch(url, {method: 'POST', ...options})
    .then(response => {
      if (!response.status || response.status >= 300) {
        return response.json()
          .then(json => {
            console.error(json);
            return Promise.reject(json);
          });
      }

      return response.json();
    });
};
