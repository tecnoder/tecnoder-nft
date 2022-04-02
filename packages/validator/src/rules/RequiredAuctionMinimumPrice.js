"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredAuctionMinimumPrice = void 0;
require("reflect-metadata");
const registerDecorator_1 = require("../registerDecorator");
const _RULE = 'RequiredAuctionMinimumPrice';
class RequiredAuctionMinimumPriceValidationRule {
    evaluate(target, value, key, options) {
        if (target.dropTypeId === 1 && isNaN(value) === false && value > 0) {
            return null;
        }
        let message = `Auction minimum price is required`;
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
RequiredAuctionMinimumPriceValidationRule.instance = new RequiredAuctionMinimumPriceValidationRule();
function RequiredAuctionMinimumPrice(options) {
    return function (target, propertyKey) {
        (0, registerDecorator_1.registerDecorator)(target, propertyKey, RequiredAuctionMinimumPriceValidationRule.instance, _RULE, options);
    };
}
exports.RequiredAuctionMinimumPrice = RequiredAuctionMinimumPrice;
//# sourceMappingURL=RequiredAuctionMinimumPrice.js.map