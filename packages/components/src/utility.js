"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DT_FMT_DB = exports.isErrorExists = void 0;
function isErrorExists(errorObject) {
    return errorObject != undefined && errorObject != null && Object.keys(errorObject).length > 0;
}
exports.isErrorExists = isErrorExists;
exports._DT_FMT_DB = "MM-DD-YYYY HH:mm:ss";
//# sourceMappingURL=utility.js.map