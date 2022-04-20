export const validEmailRegex = new RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

export const validUrlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

export const alphaRegex = new RegExp(/^[a-zA-Z\s]+$/);

export const alphaNumRegex = new RegExp(/^[0-9a-zA-Z\s]+$/);

export const integerRegex = new RegExp(/^[0-9]+$/);

export const decimalRegex = new RegExp(/^\d+(\.\d{1,2})?$/);

export const alphaNumSpecialRegex = new RegExp(/^[A-Za-z\d*.!@$%#`'"^&(){}[\]:;<>,.?\/~_+\\=|\-]+$/);

export const MDY_FMT = "MM-DD-YYYY";
export const MDY_TIME_FMT = "MM-DD-YYYY HH:mm:ss";
export const YMD_TIME_FMT = "YYYY-MM-DD HH:mm:ss";