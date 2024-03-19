var CryptoJS = require("crypto-js");

export const ENV = {
  baseURL: process.env.REACT_APP_BASE_URL,
  secret_key: process.env.REACT_APP_CRYPTO_KEY,
  imageURL: process.env.REACT_APP_BASE_URL_image,
  getToken: () =>{
    let token = localStorage.getItem('adminToken');
    return JSON.parse(token);
    
  },
  

  encryptAdmin: (token,adminData) => {
    let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(adminData), ENV.secret_key).toString();
    localStorage.setItem('adminData', encryptedData);
    localStorage.setItem('adminToken', JSON.stringify(token));
  },
  decryptAdmin: () => {
    let encryptData = localStorage.getItem('adminData');
    let decryptedData = CryptoJS.AES.decrypt(encryptData, ENV.secret_key);
    let originalText = decryptedData.toString(CryptoJS.enc.Utf8);
    let decryptedObject = JSON.parse(originalText);
  },
  clearLocalStorage: () => {
    localStorage.clear();
    console.log("local storage clear successfully");
  }

}