"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Required = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'Required';
class RequiredValidationRule {
    evaluate(_target, value, key, options) {
        if (value) {
            return null;
        }
        let message = `${key} is required`;
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
RequiredValidationRule.instance = new RequiredValidationRule();
function Required(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, RequiredValidationRule.instance, _RULE, options);
    };
}
exports.Required = Required;
//# sourceMappingURL=Required.js.map