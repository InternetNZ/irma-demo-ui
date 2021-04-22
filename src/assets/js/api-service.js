// ignoring IIFE to test purposes - this should be really globals

const AWS_IRMA_BACKEND_SERVER = 'https://f9emnttxd6.execute-api.ap-southeast-2.amazonaws.com/demo';

const SECOND_PRIVATE_TOKEN = 'slU2raoR4f6q1eiVQbYuk5GGI3j2qaL25BdB6SSA';

const checkPassport = (base64Image) => {
  return _apiSingleSourcePost('passports', {
    document_image: base64Image,
    country_code: 'NZL',
  });
}

const checkDriverLicence = (base64Image) => {
  return _apiSingleSourcePost('drivers-licences', {
    document_image: base64Image,
    country_code: 'NZL',
  });
}

const _apiSingleSourcePost = (endpoint, body) => {
  const url = `${AWS_IRMA_BACKEND_SERVER}/single-source/${endpoint}`;
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
