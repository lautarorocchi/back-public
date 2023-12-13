import cryptoRandomString from 'crypto-random-string';

function generateUniqueCode(length = 6) {
  return cryptoRandomString({ length, type: 'alphanumeric' });
}

export{
    generateUniqueCode
}