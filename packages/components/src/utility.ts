export function isErrorExists(errorObject: any){
    return errorObject!=undefined && errorObject!=null && Object.keys(errorObject).length > 0
}

export const _DT_FMT_DB = "MM-DD-YYYY HH:mm:ss";