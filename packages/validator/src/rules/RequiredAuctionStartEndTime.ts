import "reflect-metadata";
import { IValidationRule } from "../IValidationRule";
import { ValidationOptions } from "../ValidationOptions";
import { registerDecorator } from "../registerDecorator";

const _RULE = 'RequiredAuctionStartEndTime';

class RequiredAuctionStartEndTimeValidationRule implements IValidationRule {
    static instance = new RequiredAuctionStartEndTimeValidationRule();

    evaluate(target: any, value: any, key: string, options?: ValidationOptions[]): any {
        if ((target.dropTypeId===1||target.dropTypeId===3) && value) {
            return null;
        }

        let message: string = `Start time is required`;

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

export function RequiredAuctionStartEndTime(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, RequiredAuctionStartEndTimeValidationRule.instance, _RULE, options)
    }
}