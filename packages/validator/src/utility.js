"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphaNumSpecialRegex = exports.decimalRegex = exports.integerRegex = exports.alphaNumRegex = exports.alphaRegex = exports.validUrlRegex = exports.validEmailRegex = void 0;
exports.validEmailRegex = new RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
exports.validUrlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
exports.alphaRegex = new RegExp(/^[a-zA-Z\s]+$/);
exports.alphaNumRegex = new RegExp(/^[0-9a-zA-Z\s]+$/);
exports.integerRegex = new RegExp(/^[0-9]+$/);
exports.decimalRegex = new RegExp(/^\d+(\.\d{1,2})?$/);
exports.alphaNumSpecialRegex = new RegExp(/^[A-Za-z\d*.!@$%#`'"^&(){}[\]:;<>,.?\/~_+\\=|\-]+$/);
//# sourceMappingURL=utility.js.map