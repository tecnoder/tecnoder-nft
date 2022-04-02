"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimumPriceLtBuyNow = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'MinimumPriceLtBuyNow';
class MinimumPriceLtBuyNowValidationRule {
    evaluate(target, value, key, options) {
        if (target.hasBuyItNow === true && value < target.buyItNowPrice && value > 0) {
            return null;
        }
        let message = `Minimum price should be less than buy it now price`;
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
MinimumPriceLtBuyNowValidationRule.instance = new MinimumPriceLtBuyNowValidationRule();
function MinimumPriceLtBuyNow(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, MinimumPriceLtBuyNowValidationRule.instance, _RULE, options);
    };
}
exports.MinimumPriceLtBuyNow = MinimumPriceLtBuyNow;
//# sourceMappingURL=MinimumPriceLtBuyNow.js.map