var CryptoJS = require("crypto-js");

export const ENV = {
    baseURL: process.env.REACT_APP_BASE_URL ,
    imageURL:process.env.REACT_APP_BASE_URL_image,

    encryptAdmin: (data) =>{
        let encryptedData = CryptoJS.AES.encrypt(data, 'secret key 123').toString();
          // Save encrypted data in local storage
          localStorage.setItem('encryptedData', encryptedData);
    }



}