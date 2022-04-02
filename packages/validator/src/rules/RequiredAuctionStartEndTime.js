"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredAuctionStartEndTime = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'RequiredAuctionStartEndTime';
class RequiredAuctionStartEndTimeValidationRule {
    evaluate(target, value, key, options) {
        if ((target.dropTypeId === 1 || target.dropTypeId === 3) && value) {
            return null;
        }
        let message = `Start time is required`;
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
RequiredAuctionStartEndTimeValidationRule.instance = new RequiredAuctionStartEndTimeValidationRule();
function RequiredAuctionStartEndTime(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, RequiredAuctionStartEndTimeValidationRule.instance, _RULE, options);
    };
}
exports.RequiredAuctionStartEndTime = RequiredAuctionStartEndTime;
//# sourceMappingURL=RequiredAuctionStartEndTime.js.map