"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasNoOfCopies = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'HasNoOfCopies';
class HasNoOfCopiesValidationRule {
    evaluate(target, value, key, options) {
        if ((target.dropTypeId === 1 && value === 1) || (target.dropTypeId === 2 && value > 1)) {
            return null;
        }
        let message = `Number of copies is required`;
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
HasNoOfCopiesValidationRule.instance = new HasNoOfCopiesValidationRule();
function HasNoOfCopies(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, HasNoOfCopiesValidationRule.instance, _RULE, options);
    };
}
exports.HasNoOfCopies = HasNoOfCopies;
//# sourceMappingURL=HasNoOfCopies.js.map