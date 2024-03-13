var CryptoJS = require("crypto-js");

export const ENV = {
    baseURL: process.env.REACT_APP_BASE_URL ,
    imageURL:process.env.REACT_APP_BASE_URL_image,

    encryptAdmin: (data) =>{
        let encryptedData = CryptoJS.AES.encrypt(data, 'secret key 123').toString();
        
          localStorage.setItem('encryptedData', encryptedData);
    },
    clearLocalStorage: () =>{
      localStorage.clear();
      console.log("local storage clear successfully");
    }

}