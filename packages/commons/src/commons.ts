import { UserService } from "./api/service";

export const validEmailRegex = new RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

export const validUrlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

export const alphaRegex = new RegExp(/^[a-zA-Z\s]+$/);

export const alphaNumRegex = new RegExp(/^[0-9a-zA-Z\s]+$/);

export const integerRegex = new RegExp(/^[0-9]+$/);

export const decimalRegex = new RegExp(/^\d+(\.\d{1,2})?$/);

export const alphaNumSpecialRegex = new RegExp(/^[A-Za-z\d*.!@$%#`'"\s^&(){}[\]:;<>,.?\/~_+\\=|\-]+$/);

export function isErrorExists(errorObject: any){
    return errorObject!=undefined && errorObject!=null && Object.keys(errorObject).length > 0
}

export function getAge(dateString: any) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const clearAllValue = () => localStorage.clear();

export function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(document.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const gotoPaymentApp = async (url: string, params: any, actionType: string, user: any) => {
    const response = await UserService.getSsoToken(Object.assign({
        successUrl: window.location.origin + url,
        cancelUrl: window.location.origin + url
    }, params));
    if (response && response.status === "SUCCESS") {
        window.location.href = `${process.env.REACT_APP_PAYMENT_URL}/sso/${actionType}?d=${response.data}`;
    }
    return response;
}

export function isLoggedIn(user: any){
    return !!(user && user.jwtId);
}

export const MDY_FMT = "MM-DD-YYYY";
export const MDY_TIME_FMT = "MM-DD-YYYY HH:mm:ss";
export const YMD_TIME_FMT = "YYYY-MM-DD HH:mm:ss";

export const gotoIdentityApp = (url: string, params: any, user: any) => {
    return UserService.getSsoToken(Object.assign({
        successUrl: window.location.origin + url,
        cancelUrl: window.location.origin + url
    }, params))
    .then(response=>{
        if(response && response.status==="SUCCESS"){
            window.location.href = `${process.env.REACT_APP_IDENTITY_URL}/sso/verification/kyc?d=${response.data}`;
        }
        return response;
    })
}

export const isKycDocVerified = (user)=>{
    return user && user.kycDocStatus===KycStatus.COMPLETE;
}

export const isKycDocPending = (user)=>{
    return user && user.kycDocStatus===KycStatus.PENDING;
}

export const isKycDocFailed = (user)=>{
    return user && user.kycDocStatus===KycStatus.FAILED;
}

export const isKycIdVerified = (user)=>{
    return user && user.kycIdStatus===KycStatus.COMPLETE;
}

export const isKycIdPending = (user)=>{
    return user && (user.kycIdStatus===KycStatus.PENDING);
}

export const isKycIdFailed = (user)=>{
    return user && (user.kycIdStatus===KycStatus.FAILED);
}

export const KycStatus = {PENDING: "PENDING", COMPLETE: "COMPLETE", FAILED: "FAILED"};
export const KycType = {DOC: "DOC", ID: "ID"};

export * as api from "./api/api"
export * as reduxActions from "./redux/actions"
export * as reduxReducers from "./redux/reducers"
export {store, useAppDispatch, useAppSelector, AppDispatch} from "./redux/store"
export * as reduxSlices from "./redux/slices"