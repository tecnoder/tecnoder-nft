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