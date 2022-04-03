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

const UserService = {

    logout: async function(token: any){
        try {
            return await postData(`/user-management/sign-out`, token);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },    
    
    getUserDetails: async function(){
        try {
            return await postData(`/rest/user/get-user-details`);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },    

    updateUserDetails: async function(payload, headers){
        try {
            return await postData(`/rest/user/update-user-details`, payload, {headers: headers});
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },    

    getMyBalance: async function(currency?: string){
        try {
            return await postData(`/rest/user/get-my-balance?${currency? 'currency='+currency : ''}`);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },    

    getUserTrans: async function(){
        try {
            return await postData(`/rest/user/get-user-trans`);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },    

    getSsoToken: async function(payload){
        try {
            return await postData(`/rest/user/get-sso-verification-jwt`, payload);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    searchUsersByProfile: async function(name: string){
        try {
            return await postData(`/public/search-users-by-profile?name=${name}`);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    verifyKycStatus: async function(){
        try {
            return await postData(`/public/verify-kyc-status`);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    checkDocVerificationStatus: async function(){
        try {
            return await postData(`/rest/user/verify-documents-verification-status`);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    decryptExchangeData: async function(payload: any){
        try {
            return await postData(`/rest/user/encrypt-exchange-data`, payload);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    checkKycNeeded: async function(){
        try {
            return await postData(`/rest/user/is-kyc-needed`, null);
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    }, 

    getAccessTypes: async function(){
        try {
            const response = await postData(`/user-management/get-access-list`, {});
            return response;
        } catch (error) {
            console.log(error.response);
            throw new AuthenticationError(error.response.status, error.response.data)
        }
    },    
}

export default UserService

export { UserService }