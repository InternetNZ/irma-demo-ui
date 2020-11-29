// ignoring IIFE to test purposes - this should be really globals

const LOCALE_NZ = 'en-NZ';

//const AWS_IRMA_SERVER = 'http://13.54.7.159:8088';
const AWS_IRMA_SERVER = 'https://pnonvsmdy9.execute-api.ap-southeast-2.amazonaws.com/dev';
const LOCAL_IRMA_SERVER = 'https://2838d2a173e7.ngrok.io';

const IRMA_SERVER = AWS_IRMA_SERVER;
const AUTH_METHOD_TOKEN = 'token';
const PRIVATE_TOKEN = 'secret-fake-token';

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
  INTERNETNZ_MEMBERSHIP_ID: `${CREDENTIAL.INTERNETNZ_MEMBERSHIP}.id`,
  INTERNETNZ_MEMBERSHIP: {
    ID: `${CREDENTIAL.INTERNETNZ_MEMBERSHIP}.id`,
    VALID_UNTIL: `${CREDENTIAL.INTERNETNZ_MEMBERSHIP}.validUntil`,
  },
  FAKE_EMAILER_EMAIL: {
    EMAIL: `${CREDENTIAL.FAKE_EMAILER_EMAIL}.email`,
  },
  FAKE_PERSONAL_DATA_PERSON_NAME_FULL_NAME: `${CREDENTIAL.FAKE_PERSONAL_DATA_PERSON_NAME}.fullName`,
  FAKE_NZPOST_FULL_ADDRESS: `${CREDENTIAL.FAKE_NZPOST_FULL_ADDRESS}.fullAddress`,
  FAKE_PERSONAL_DATA_AGE_LIMITS_OVER18: `${CREDENTIAL.FAKE_PERSONAL_DATA_AGE_LIMITS}.over18`,
  // random attribute from irma-demo scheme
  IRMA_DEMO_NIJMEGEN_AGE_LIMITS_OVER18: `${CREDENTIAL.IRMA_DEMO_NIJMEGEN_AGE_LIMITS}.over18`,
};
