import "reflect-metadata";
import { IValidationRule } from "../IValidationRule";
import { ValidationOptions } from "../ValidationOptions";
import { registerDecorator } from "../registerDecorator";


const _RULE = 'RequiredAuctionMinimumPrice';

class RequiredAuctionMinimumPriceValidationRule implements IValidationRule {
    static instance = new RequiredAuctionMinimumPriceValidationRule();

    evaluate(target: any, value: any, key: string, options?: ValidationOptions[]): any {
        if (target.dropTypeId===1 && isNaN(value)===false && value>0) { // minimumPrice less than buyItNowPrice
            return null;
        }

        let message: string = `Auction minimum price is required`;

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

export function RequiredAuctionMinimumPrice(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, RequiredAuctionMinimumPriceValidationRule.instance, _RULE, options)
    }
}