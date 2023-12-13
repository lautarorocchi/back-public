import cryptoRandomString from 'crypto-random-string';

function generateUniqueCode(length = 6) {
  return cryptoRandomString({ length, type: 'alphanumeric' });
}

/*// Ejemplo de uso:
const uniqueCode = generateUniqueCode();
console.log(uniqueCode);*/

export{
    generateUniqueCode
}