const NodeRSA = require('node-rsa');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const envs = require('./../envs.json');

const bolttechURL = envs.BOLTTECH_URL_RC;
const bolttechPublicKey = envs.BOLTTECH_PUBLIC_KEY;
const tgfonePrivateKey = envs.TGFONE_PRIVATE_KEY;
const partnerName = envs.PARTNER_NAME;
const rsa = new NodeRSA(bolttechPublicKey);

const processForm = async (window, payload, alertStatus) => {
  try {
    window.electron.appendAlert('Processing...', 'primary', alertStatus);
    const encryptedData = rsa.encrypt(JSON.stringify(payload.userData), 'base64');

    payload.userData = encryptedData;

    const token = jwt.sign(payload, tgfonePrivateKey, {
      algorithm: 'RS256',
      audience: ['https://www.bolttech.co.th'],
      issuer: partnerName
    });

    const body = {
      data: JSON.stringify({ token })
    };
    const headers = {
      'Content-Type': 'application/json'
    };

    const { data } = await axios.post(bolttechURL, body, { headers });
    if (data) {
      console.log(data);
      window.electron.appendAlert('Successfully integrated!', 'success', alertStatus);
    }
  } catch (error) {
    console.log(error);
    window.electron.appendAlert(error.message, 'danger', alertStatus);
  }
};

exports.processForm = processForm;