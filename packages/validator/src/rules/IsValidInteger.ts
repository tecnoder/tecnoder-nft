import "reflect-metadata";
import { IValidationRule } from '../IValidationRule';
import { ValidationOptions } from '../ValidationOptions';
import { registerDecorator } from '../registerDecorator';

const _RULE = 'IsValidInteger';

class IsValidIntegerRule implements IValidationRule {
    static instance = new IsValidIntegerRule();

    evaluate(_target: any, value: any, key: string, options?: ValidationOptions[]): any {

        let regex = /^[0-9]+$/;

        if(typeof value === "undefined" || value === null || value === "" || regex.test(value)){
            return null;
        }

        let message: string = `Invalid number`;
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

export function IsValidInteger(options?: ValidationOptions){
    return function(target: any, propertyKey: string){
        registerDecorator(target, propertyKey, IsValidIntegerRule.instance, _RULE, options)
    }
}