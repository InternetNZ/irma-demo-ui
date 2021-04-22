// ignoring IIFE to test purposes - this should be really globals

const LOCALE_NZ = 'en-NZ';

//const AWS_IRMA_SERVER = 'http://13.54.7.159:8088';
const AWS_IRMA_SERVER = 'https://pnonvsmdy9.execute-api.ap-southeast-2.amazonaws.com/dev';
const LOCAL_IRMA_SERVER = 'https://72e3545ec016.ngrok.io';
//const LOCAL_IRMA_SERVER = 'http://0.0.0.0:8088';

const IRMA_SERVER = AWS_IRMA_SERVER;
const AUTH_METHOD_TOKEN = 'token';
const PRIVATE_TOKEN = 'secret-fake-token';

const CREDENTIAL = {
  ID_CARD_ID_CARD: 'irma-demo.inz-id-card.idCard',
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
  ID_CARD: {
    FIRST_NAME: `${CREDENTIAL.ID_CARD_ID_CARD}.firstName`,
    LAST_NAME: `${CREDENTIAL.ID_CARD_ID_CARD}.lastName`,
    FULL_NAME: `${CREDENTIAL.ID_CARD_ID_CARD}.fullName`,
    BIRTH_DATE: `${CREDENTIAL.ID_CARD_ID_CARD}.birthdate`,
    OVER_18: `${CREDENTIAL.ID_CARD_ID_CARD}.over18`,
    OVER_20: `${CREDENTIAL.ID_CARD_ID_CARD}.over20`,
    OVER_65: `${CREDENTIAL.ID_CARD_ID_CARD}.over65`,
    ISSUE_DATE: `${CREDENTIAL.ID_CARD_ID_CARD}.issueDate`,
    EXPIRY_DATE: `${CREDENTIAL.ID_CARD_ID_CARD}.expiryDate`,
    NUMBER: `${CREDENTIAL.ID_CARD_ID_CARD}.number`,
  },
};

const HEADER_MESSAGES = {
  ISSUE_EMAIL: 'Issuing your <b>e-mail address</b> to',
  ISSUE_NAME: 'Issuing your <b>full name</b> address to',
  ISSUE_ADDRESS: 'Issuing your <b>postal address</b> address to',
  ISSUE_AGE: 'Issuing your <b>age</b> address to',
  ISSUE_BIRTHDATE: 'Issuing your <b>birthdate</b> address to',
  ISSUE_INZ_MEMBERSHIP: 'Issuing your <b>InternetNZ membership</b> to',
  ISSUE_ID_CARD_ID_CARD: 'Issuing your <b>IDNZ Card</b> to',
  ISSUE_NETHUI_ACCESS_PASS: 'Issuing your <b>NetHui access pass</b> to',
  DISCLOSE_ADDDRESS: 'Disclosing your <b>address</b> with',
  DISCLOSE_ADDDRESS_AND_NAME: 'Disclosing your <b>full address</b> and <b>full name</b> with',
  DISCLOSE_AGE: 'Disclosing your <b>age</b> with',
  DISCLOSE_INZ_MEMBERSHIP: 'Disclosing your <b>InternetNZ membership</b> with',
  DISCLOSE_EMAIL_NAME: 'Disclosing your <b>e-mail address</b> and <b>full name</b> with',
  DISCLOSE_NAME_EMAIL_MEMBERSHIP: 'Disclosing your <b>e-mail address</b>, <b>full name</b> and <b>InternetNZ membership</b> with',
  DISCLOSE_NETHUI_ACCESS_PASS: 'Disclosing your <b>NetHui access pass</b> to',
};
