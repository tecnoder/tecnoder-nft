/* Common Utilities */
export const setValue = (key: string, value: string) => sessionStorage.setItem(key, value);

export const getValue = (key: string) => sessionStorage.getItem(key);

export const removeValue = (key: string) => sessionStorage.removeItem(key);

export const clearAllValue = () => localStorage.clear();

export const validEmailRegex = new RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

export const validUrlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

export const alphaRegex = new RegExp(/^[a-zA-Z\s]+$/);

export const alphaNumRegex = new RegExp(/^[0-9a-zA-Z\s]+$/);

export const integerRegex = new RegExp(/^[0-9]+$/);

export const decimalRegex = new RegExp(/^\d+(\.\d{1,2})?$/);

export const alphaNumSpecialRegex = new RegExp(/^[A-Za-z\d*.!@$%#`'"\s^&(){}[\]:;<>,.?\/~_+\\=|\-]+$/);

export const getUrlData = () => {
    // https://dmitripavlutin.com/parse-url-javascript/
    const currentUrl = new URL(window.location.href)
    return currentUrl
}

export function isErrorExists(errorObject: any){
    return errorObject!=undefined && errorObject!=null && Object.keys(errorObject).length > 0
}