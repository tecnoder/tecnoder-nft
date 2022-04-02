"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidUrl = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const utility_1 = require("../utility");
const _RULE = 'NotStartsWithRule';
class IsValidUrlRule {
    evaluate(_target, value, key, _options) {
        let regex = utility_1.validUrlRegex;
        if (!value || regex.test(value)) {
            return null;
        }
        let message = `Invalid Url`;
        return { key: key, message: message };
    }
}
IsValidUrlRule.instance = new IsValidUrlRule();
function IsValidUrl(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, IsValidUrlRule.instance, _RULE, options);
    };
}
exports.IsValidUrl = IsValidUrl;
//# sourceMappingURL=IsValidUrl.js.map