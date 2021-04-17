/** @format */

import hivesigner from 'hivesigner';

require('dotenv').config();

const hivesignerClient = new hivesigner.Client({
  app: 'loginking',
  baseURL: 'https://hivesigner.com',
  callbackURL:
    process.env.REACT_APP_SC_CALLBACK || 'https://hashkings.app/callback',
  scope: ['custom_json', 'login', 'logout'],
});

export const hivesignerSignup = () => {
  const URL = `https://hiveonboard.com/create-account?ref=gamsam&redirect_url=${
    process.env.REACT_APP_SC_CALLBACK || 'https://hashkings.app/callback'
  }/`;
  window.open(URL);
};

export default hivesignerClient;
