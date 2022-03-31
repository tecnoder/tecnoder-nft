import "reflect-metadata";
import { IValidationRule } from '../IValidationRule';
import { ValidationOptions } from '../ValidationOptions';
import { registerDecorator } from '../registerDecorator';

const _RULE = 'IsValidDecimal';

class IsValidDecimalRule implements IValidationRule {
    static instance = new IsValidDecimalRule();

    evaluate(_target: any, value: any, key: string, options?: ValidationOptions[]): any {

        let regex = /^\d+(\.\d{1,2})?$/;

        if(typeof value === "undefined" || value === null || value === "" || regex.test(value)){
            return null;
        }

        let message: string = `Invalid amount`;
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

export function IsValidDecimal(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, IsValidDecimalRule.instance, _RULE, options)
    }
}