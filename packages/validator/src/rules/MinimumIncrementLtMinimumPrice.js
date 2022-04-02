"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimumIncrementLtMinimumPrice = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'MinimumIncrementLtMinimumPrice';
class MinimumIncrementLtMinimumPriceValidationRule {
    evaluate(target, value, key, options) {
        if (value < target.minimumBidIncrement) {
            return null;
        }
        let message = `Minimum increment price should be less than minimum price`;
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
MinimumIncrementLtMinimumPriceValidationRule.instance = new MinimumIncrementLtMinimumPriceValidationRule();
function MinimumIncrementLtMinimumPrice(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, MinimumIncrementLtMinimumPriceValidationRule.instance, _RULE, options);
    };
}
exports.MinimumIncrementLtMinimumPrice = MinimumIncrementLtMinimumPrice;
//# sourceMappingURL=MinimumIncrementLtMinimumPrice.js.map