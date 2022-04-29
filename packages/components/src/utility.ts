import { UserService } from "@sindric-lib-ui/commons/lib/api/service";

export function isErrorExists(errorObject: any){
    return errorObject!=undefined && errorObject!=null && Object.keys(errorObject).length > 0
}

export const _DT_FMT_DB = "MM-DD-YYYY HH:mm:ss";

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