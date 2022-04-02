"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidInteger = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'IsValidInteger';
class IsValidIntegerRule {
    evaluate(_target, value, key, options) {
        let regex = /^[0-9]+$/;
        if (typeof value === "undefined" || value === null || value === "" || regex.test(value)) {
            return null;
        }
        let message = `Invalid number`;
        if (options) {
            let option = options.find(element => element.constraint === _RULE);
            if (option) {
                if (option.message) {
                    message = option.message;
                }
            }
        }
        return { key: key, message: message };
    }
}
IsValidIntegerRule.instance = new IsValidIntegerRule();
function IsValidInteger(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, IsValidIntegerRule.instance, _RULE, options);
    };
}
exports.IsValidInteger = IsValidInteger;
//# sourceMappingURL=IsValidInteger.js.map