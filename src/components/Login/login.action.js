import {ENV} from "../../config/config";
import { LOGIN_ADMIN } from "../../redux/types";

export const loginAdmin= (credentials) =>{
    return async(dispatch) =>{
        console.log(`${ENV.baseURL}admin/login`)
        try{
            const response = await fetch(`${ENV.baseURL}admin/login`,{
                
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(credentials),
            });
            const data = await response.json();
            
            dispatch({
                type:LOGIN_ADMIN,
                payload:data
            })

        }catch(error){
            console.error(error);

        }

    }
}