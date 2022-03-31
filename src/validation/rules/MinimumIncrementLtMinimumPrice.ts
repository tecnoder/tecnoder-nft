import "reflect-metadata";
import { IValidationRule } from "../IValidationRule";
import { ValidationOptions } from "../ValidationOptions";
import { registerDecorator } from "../registerDecorator";

const _RULE = 'MinimumIncrementLtMinimumPrice';

class MinimumIncrementLtMinimumPriceValidationRule implements IValidationRule {
    static instance = new MinimumIncrementLtMinimumPriceValidationRule();

    evaluate(target: any, value: any, key: string, options?: ValidationOptions[]): any {

        if (value < target.minimumBidIncrement) { // minimumPrice greater than minimumBidIncrement
            return null;
        }

        let message: string = `Minimum increment price should be less than minimum price`;

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

export function MinimumIncrementLtMinimumPrice(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, MinimumIncrementLtMinimumPriceValidationRule.instance, _RULE, options)
    }
}