/* Common Utilities */
export const setValue = (key: string, value: string) => sessionStorage.setItem(key, value);

export const getValue = (key: string) => sessionStorage.getItem(key);

export const removeValue = (key: string) => sessionStorage.removeItem(key);

export const clearAllValue = () => localStorage.clear();

export const getUrlData = () => {
    // https://dmitripavlutin.com/parse-url-javascript/
    const currentUrl = new URL(window.location.href)
    return currentUrl
}

export function isErrorExists(errorObject: any){
    return errorObject!=undefined && errorObject!=null && Object.keys(errorObject).length > 0
}