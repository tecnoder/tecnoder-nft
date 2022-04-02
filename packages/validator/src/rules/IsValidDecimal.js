"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidDecimal = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'IsValidDecimal';
class IsValidDecimalRule {
    evaluate(_target, value, key, options) {
        let regex = /^\d+(\.\d{1,2})?$/;
        if (typeof value === "undefined" || value === null || value === "" || regex.test(value)) {
            return null;
        }
        let message = `Invalid amount`;
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
IsValidDecimalRule.instance = new IsValidDecimalRule();
function IsValidDecimal(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, IsValidDecimalRule.instance, _RULE, options);
    };
}
exports.IsValidDecimal = IsValidDecimal;
//# sourceMappingURL=IsValidDecimal.js.map