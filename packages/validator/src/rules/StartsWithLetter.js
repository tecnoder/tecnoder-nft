"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartsWithLetter = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'StartsWithLetter';
class StartsWithLetterRule {
    evaluate(_target, value, key, options) {
        if (!(value.charAt(0) <= "9" && value.charAt(0) >= "0")) {
            return null;
        }
        let message = `${key} must start with a letter`;
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
StartsWithLetterRule.instance = new StartsWithLetterRule();
function StartsWithLetter(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, StartsWithLetterRule.instance, _RULE, options);
    };
}
exports.StartsWithLetter = StartsWithLetter;
//# sourceMappingURL=StartsWithLetter.js.map