var CryptoJS = require("crypto-js");

export const ENV = {
    baseURL: process.env.REACT_APP_BASE_URL ,
    secret_key: process.env.REACT_APP_API_KEY,
    imageURL:process.env.REACT_APP_BASE_URL_image,
    
    encryptAdmin: (data) =>{

        let encryptedData = CryptoJS.AES.encrypt(data, ENV.secret_key).toString();
          localStorage.setItem('encryptedData', encryptedData);
    },
    clearLocalStorage: () =>{
      localStorage.clear();
      console.log("local storage clear successfully");
    }

}