
// ignoring IIFE to test purposes - this should be really globals
//const AWS_IRMA_SERVER = 'http://13.54.7.159:8088';
const AWS_IRMA_SERVER = 'https://k4erdd8uc6.execute-api.ap-southeast-2.amazonaws.com/dev';
const LOCAL_IRMA_SERVER = 'https://2838d2a173e7.ngrok.io';

const IRMA_SERVER = AWS_IRMA_SERVER;
const AUTH_METHOD_TOKEN = 'token';
const PRIVATE_TOKEN = 'secret-fake-token';

const CREDENTIAL = {
  INTERNETNZ_MEMBERSHIP: 'inz-demo.internetnz.membership',
  FAKE_EMAILER_EMAIL: 'inz-demo.emailer.email',
  FAKE_PERSONAL_DATA_NAME: 'inz-demo.personal-data.personName',
  FAKE_PERSONAL_DATA_AGE_LIMITS: 'inz-demo.personal-data.ageLimits',
  FAKE_PERSONAL_DATA_BIRTHDATE: 'inz-demo.personal-data.birthdate',
  FAKE_NZPOST_FULL_ADDRESS: 'inz-demo.postal-service.address',
  IRMA_DEMO_NIJMEGEN_AGE_LIMITS: 'irma-demo.nijmegen.ageLimits',
};

const ATTRIBUTE = {
  FAKE_EMAILER_EMAIL: CREDENTIAL.FAKE_EMAILER_EMAIL + '.email',
  FAKE_PERSONAL_DATA_NAME: 'inz-demo.personal-data.personName.fullName',
  FAKE_NZPOST_FULL_ADDRESS: 'inz-demo.postal-service.address.fullAddress',
};
