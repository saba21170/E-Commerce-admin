var CryptoJS = require("crypto-js");

export const ENV = {
  baseURL: process.env.REACT_APP_BASE_URL,
  secret_key: process.env.REACT_APP_CRYPTO_KEY,
  imageURL: process.env.REACT_APP_BASE_URL_image,

  encryptAdmin: (data) => {
    let encryptedData = CryptoJS.AES.encrypt(data, ENV.secret_key).toString();
    localStorage.setItem('encryptedData', encryptedData);
  },
  decryptAdmin: () => {
    let encryptData = localStorage.getItem('encryptedData');
    let decryptedData = CryptoJS.AES.decrypt(encryptData, ENV.secret_key);
    let originalText = decryptedData.toString(CryptoJS.enc.Utf8);

    let decryptedObject = JSON.parse(originalText);
    if (decryptedObject && decryptedObject.token) {

      return decryptedObject.token;
    } else {
      console.error("Token not found in decrypted data");
      return null;
    }

  },
  clearLocalStorage: () => {
    localStorage.clear();
    console.log("local storage clear successfully");
  }

}