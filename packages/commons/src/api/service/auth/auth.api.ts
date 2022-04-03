import { postData } from "../../api";

class AuthenticationError extends Error {
    errorCode: any;
    constructor(errorCode: any, message: any) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const AuthService = {

    createUser: async function(data: any){
        try {
            return await postData(`/auth/createUser`,data);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    verifyUser: async function(vid: string){
        try {
            return await postData(`/auth/verifyUser?vid=${vid}`,{});
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    registerUser: async function(data: any){
        try {
            return await postData(`/auth/registerUser`,data);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    login: async function(data: any){
        try {
            return await postData(`/auth/login`,data);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    getSessionUser: async function(){
        try {
            return await postData(`/auth/getSessionUser`);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },



    

    
    
}

export default AuthService

export { AuthService }