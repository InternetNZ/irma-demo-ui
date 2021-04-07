// ignoring IIFE to test purposes - this should be really globals

const LOCALE_NZ = 'en-NZ';

//const AWS_IRMA_SERVER = 'http://13.54.7.159:8088';
const AWS_IRMA_SERVER = 'https://pnonvsmdy9.execute-api.ap-southeast-2.amazonaws.com/dev';
//const AWS_IRMA_BACKEND_SERVER = 'https://f9emnttxd6.execute-api.ap-southeast-2.amazonaws.com/demo';
const AWS_IRMA_BACKEND_SERVER = 'http://localhost:5000';
const LOCAL_IRMA_SERVER = 'https://2838d2a173e7.ngrok.io';

const IRMA_SERVER = AWS_IRMA_SERVER;
const AUTH_METHOD_TOKEN = 'token';
const PRIVATE_TOKEN = 'secret-fake-token';
const SECOND_PRIVATE_TOKEN = 'slU2raoR4f6q1eiVQbYuk5GGI3j2qaL25BdB6SSA';

const CREDENTIAL = {
  INTERNETNZ_MEMBERSHIP: 'irma-demo.inz-internetnz.membership',
  INTERNETNZ_NETHUI_ACCESS_PASS: 'irma-demo.inz-internetnz.nethuiAccessPass',
  FAKE_EMAILER_EMAIL: 'irma-demo.inz-emailer.email',
  FAKE_PERSONAL_DATA_PERSON_NAME: 'irma-demo.inz-personal-data.personName',
  FAKE_PERSONAL_DATA_AGE_LIMITS: 'irma-demo.inz-personal-data.ageLimits',
  FAKE_PERSONAL_DATA_BIRTHDATE: 'irma-demo.inz-personal-data.birthdate',
  FAKE_NZPOST_FULL_ADDRESS: 'irma-demo.inz-postal-service.address',
  IRMA_DEMO_NIJMEGEN_AGE_LIMITS: 'irma-demo.nijmegen.ageLimits',
};

const ATTRIBUTE = {
  INTERNETNZ_MEMBERSHIP: {
    ID: `${CREDENTIAL.INTERNETNZ_MEMBERSHIP}.id`,
    TYPE: CREDENTIAL.INTERNETNZ_MEMBERSHIP + '.type',
    VALID_UNTIL: `${CREDENTIAL.INTERNETNZ_MEMBERSHIP}.validUntil`,
  },
  INTERNETNZ_NETHUI_ACCESS_PASS: {
    ID: CREDENTIAL.INTERNETNZ_NETHUI_ACCESS_PASS + '.id',
    EVENT: CREDENTIAL.INTERNETNZ_NETHUI_ACCESS_PASS + '.event',
    EVENT_DATE: CREDENTIAL.INTERNETNZ_NETHUI_ACCESS_PASS + '.eventDate',
    ACCESS_PASS_TYPE: CREDENTIAL.INTERNETNZ_NETHUI_ACCESS_PASS + '.accessPassType',
    PURCHASE_DATE: CREDENTIAL.INTERNETNZ_NETHUI_ACCESS_PASS + '.purchaseDate',
    PRICE: CREDENTIAL.INTERNETNZ_NETHUI_ACCESS_PASS + '.price',
  },
  FAKE_EMAILER_EMAIL: {
    EMAIL: `${CREDENTIAL.FAKE_EMAILER_EMAIL}.email`,
  },
  FAKE_PERSONAL_DATA_PERSON_NAME: {
    FULL_NAME: `${CREDENTIAL.FAKE_PERSONAL_DATA_PERSON_NAME}.fullName`,
  },
  FAKE_NZPOST_ADDRESS: {
    FULL_ADDRESS: `${CREDENTIAL.FAKE_NZPOST_FULL_ADDRESS}.fullAddress`
  },
  FAKE_PERSONAL_DATA_AGE_LIMITS: {
    OVER_18: `${CREDENTIAL.FAKE_PERSONAL_DATA_AGE_LIMITS}.over18`,
    OVER_65: `${CREDENTIAL.FAKE_PERSONAL_DATA_AGE_LIMITS}.over65`,
  },
  // attribute from irma-demo scheme
  IRMA_DEMO_NIJMEGEN_AGE_LIMITS: {
    OVER18: `${CREDENTIAL.IRMA_DEMO_NIJMEGEN_AGE_LIMITS}.over18`,
  },
};

const HEADER_MESSAGES = {
  ISSUE_EMAIL: 'Issuing your <b>e-mail address</b> to',
  ISSUE_NAME: 'Issuing your <b>full name</b> address to',
  ISSUE_ADDRESS: 'Issuing your <b>postal address</b> address to',
  ISSUE_AGE: 'Issuing your <b>age</b> address to',
  ISSUE_BIRTHDATE: 'Issuing your <b>birthdate</b> address to',
  ISSUE_INZ_MEMBERSHIP: 'Issuing your <b>InternetNZ membership</b> to',
  ISSUE_NETHUI_ACCESS_PASS: 'Issuing your <b>NetHui access pass</b> to',
  DISCLOSE_ADDDRESS: 'Disclosing your <b>address</b> with',
  DISCLOSE_ADDDRESS_AND_NAME: 'Disclosing your <b>full address</b> and <b>full name</b> with',
  DISCLOSE_AGE: 'Disclosing your <b>age</b> with',
  DISCLOSE_INZ_MEMBERSHIP: 'Disclosing your <b>InternetNZ membership</b> with',
  DISCLOSE_EMAIL_NAME: 'Disclosing your <b>e-mail address</b> and <b>full name</b> with',
  DISCLOSE_NAME_EMAIL_MEMBERSHIP: 'Disclosing your <b>e-mail address</b>, <b>full name</b> and <b>InternetNZ membership</b> with',
  DISCLOSE_NETHUI_ACCESS_PASS: 'Disclosing your <b>NetHui access pass</b> to',
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

const checkPassport = (base64Image) => {
  const body = {
    document_image: base64Image,
    country_code: 'NZL',
  };
  return _apiSingleSourcePost('passports', body)
    .then((result) => {
      console.log(result);
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
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': SECOND_PRIVATE_TOKEN,
  };
  const options = {headers, body: JSON.stringify(body)};
  console.log(options);
  return fetch(url, {method: 'POST', ...options}).then((result) => {
    console.log(result);
    return result;
  })
};
