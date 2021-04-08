// ignoring IIFE to test purposes - this should be really globals

const AWS_IRMA_BACKEND_SERVER = 'https://f9emnttxd6.execute-api.ap-southeast-2.amazonaws.com/demo';
//const AWS_IRMA_BACKEND_SERVER = 'http://localhost:5050';

const SECOND_PRIVATE_TOKEN = 'slU2raoR4f6q1eiVQbYuk5GGI3j2qaL25BdB6SSA';

const checkPassport = (base64Image) => {
  const body = {
    document_image: base64Image,
    country_code: 'NZL',
  };
  return _apiSingleSourcePost('passports', body)
    .then((result) => {
      return result;
    });
}

const checkDriverLicence = (base64Image) => {
  const body = {
    document_image: base64Image,
    country_code: 'NZL',
  };
  return _apiSingleSourcePost('drivers-licences', body)
    .then((result) => {
      console.log(result);
      return result;
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
    .then(response => response.json());
};
