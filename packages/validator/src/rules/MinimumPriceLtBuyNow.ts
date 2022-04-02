import "reflect-metadata";
import { IValidationRule } from "../IValidationRule";
import { ValidationOptions } from "../ValidationOptions";
import { registerDecorator } from "../registerDecorator";


const _RULE = 'MinimumPriceLtBuyNow';

class MinimumPriceLtBuyNowValidationRule implements IValidationRule {
    static instance = new MinimumPriceLtBuyNowValidationRule();

    evaluate(target: any, value: any, key: string, options?: ValidationOptions[]): any {
        if (target.hasBuyItNow===true && value < target.buyItNowPrice && value > 0) { // minimumPrice less than buyItNowPrice
            return null;
        }

        let message: string = `Minimum price should be less than buy it now price`;

        if(options){
            let option = options.find(element => element.constraint === _RULE);
            if(option){ 
                if(option.message){
                    message = option.message
                }
            }
        }

        return {key: key, message: message};

    }
}

export function MinimumPriceLtBuyNow(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, MinimumPriceLtBuyNowValidationRule.instance, _RULE, options)
    }
}