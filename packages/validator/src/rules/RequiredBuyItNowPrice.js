"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredBuyItNowPrice = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'RequiredBuyItNowPrice';
class RequiredBuyItNowPriceValidationRule {
    evaluate(target, value, key, options) {
        if ((target.dropTypeId === 1 && target.hasBuyItNow === false)
            || ((target.dropTypeId === 2 || target.dropTypeId === 3) && isNaN(value) === false && value > 0)) {
            return null;
        }
        let message = `Buy it now price required`;
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
RequiredBuyItNowPriceValidationRule.instance = new RequiredBuyItNowPriceValidationRule();
function RequiredBuyItNowPrice(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, RequiredBuyItNowPriceValidationRule.instance, _RULE, options);
    };
}
exports.RequiredBuyItNowPrice = RequiredBuyItNowPrice;
//# sourceMappingURL=RequiredBuyItNowPrice.js.map