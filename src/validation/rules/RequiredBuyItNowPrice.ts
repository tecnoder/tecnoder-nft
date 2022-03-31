import "reflect-metadata";

import { IValidationRule } from "../IValidationRule";
import { ValidationOptions } from "../ValidationOptions";
import { registerDecorator } from "../registerDecorator";

const _RULE = 'RequiredBuyItNowPrice';

class RequiredBuyItNowPriceValidationRule implements IValidationRule {
    static instance = new RequiredBuyItNowPriceValidationRule();

    evaluate(target: any, value: any, key: string, options?: ValidationOptions[]): any {
        if (
            (target.dropTypeId===1 && target.hasBuyItNow===false)
            || ((target.dropTypeId===2 || target.dropTypeId===3) && isNaN(value)===false && value > 0)) { // buyItNowPrice > 0 for dropType === 2 or 3 Fixed price, Time Window
            return null;
        }

        let message: string = `Buy it now price required`;

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

export function RequiredBuyItNowPrice(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, RequiredBuyItNowPriceValidationRule.instance, _RULE, options)
    }
}